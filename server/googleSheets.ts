import { google } from 'googleapis';

let connectionSettings: any;

async function getAccessToken() {
  if (connectionSettings && connectionSettings.settings.expires_at && new Date(connectionSettings.settings.expires_at).getTime() > Date.now()) {
    return connectionSettings.settings.access_token;
  }
  
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME
  const xReplitToken = process.env.REPL_IDENTITY 
    ? 'repl ' + process.env.REPL_IDENTITY 
    : process.env.WEB_REPL_RENEWAL 
    ? 'depl ' + process.env.WEB_REPL_RENEWAL 
    : null;

  if (!xReplitToken) {
    throw new Error('X_REPLIT_TOKEN not found for repl/depl');
  }

  connectionSettings = await fetch(
    'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=google-sheet',
    {
      headers: {
        'Accept': 'application/json',
        'X_REPLIT_TOKEN': xReplitToken
      }
    }
  ).then(res => res.json()).then(data => data.items?.[0]);

  const accessToken = connectionSettings?.settings?.access_token || connectionSettings.settings?.oauth?.credentials?.access_token;

  if (!connectionSettings || !accessToken) {
    throw new Error('Google Sheet not connected');
  }
  return accessToken;
}

// WARNING: Never cache this client.
// Access tokens expire, so a new client must be created each time.
async function getGoogleSheetClient() {
  const accessToken = await getAccessToken();

  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({
    access_token: accessToken
  });

  return google.sheets({ version: 'v4', auth: oauth2Client });
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  quantity: number;
  price: number;
  client?: string;
  company?: string;
}

const HEADER_ROW = ['ID', 'Nome', 'SKU', 'Quantidade', 'Preço', 'Cliente', 'Empresa'];

export async function getProducts(sheetId: string): Promise<Product[]> {
  const sheets = await getGoogleSheetClient();
  
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: 'Sheet1!A:G',
    });

    const rows = response.data.values || [];
    
    // If no rows or only header, return empty array
    if (rows.length <= 1) {
      return [];
    }

    // Convert rows to products (skip header)
    const products: Product[] = rows.slice(1).map((row) => ({
      id: row[0] || '',
      name: row[1] || '',
      sku: row[2] || '',
      quantity: parseInt(row[3]) || 0,
      price: parseFloat(row[4]) || 0,
      client: row[5] || '',
      company: row[6] || '',
    }));

    return products.filter(p => p.id); // Filter out empty rows
  } catch (error: any) {
    // If sheet is empty or doesn't exist, initialize with headers
    if (error.code === 404 || error.message?.includes('Unable to parse')) {
      await initializeSheet(sheetId);
      return [];
    }
    throw error;
  }
}

async function initializeSheet(sheetId: string) {
  const sheets = await getGoogleSheetClient();
  
  await sheets.spreadsheets.values.update({
    spreadsheetId: sheetId,
    range: 'Sheet1!A1:G1',
    valueInputOption: 'RAW',
    requestBody: {
      values: [HEADER_ROW],
    },
  });
}

export async function addProduct(sheetId: string, product: Omit<Product, 'id'>): Promise<Product> {
  const sheets = await getGoogleSheetClient();
  
  // Generate a simple ID
  const id = Date.now().toString();
  const newProduct: Product = { ...product, id };
  
  // Get current data to ensure we have headers
  const currentData = await getProducts(sheetId);
  
  // Append the new product
  const row = [
    newProduct.id,
    newProduct.name,
    newProduct.sku,
    newProduct.quantity.toString(),
    newProduct.price.toString(),
    newProduct.client || '',
    newProduct.company || '',
  ];
  
  await sheets.spreadsheets.values.append({
    spreadsheetId: sheetId,
    range: 'Sheet1!A:G',
    valueInputOption: 'RAW',
    requestBody: {
      values: [row],
    },
  });

  return newProduct;
}

export async function updateProduct(sheetId: string, productId: string, updates: Partial<Product>): Promise<Product | null> {
  const products = await getProducts(sheetId);
  const productIndex = products.findIndex(p => p.id === productId);
  
  if (productIndex === -1) {
    return null;
  }

  const updatedProduct = { ...products[productIndex], ...updates };
  
  // Update in sheet (row index is productIndex + 2 because of header and 1-indexed)
  const rowNumber = productIndex + 2;
  const sheets = await getGoogleSheetClient();
  
  const row = [
    updatedProduct.id,
    updatedProduct.name,
    updatedProduct.sku,
    updatedProduct.quantity.toString(),
    updatedProduct.price.toString(),
    updatedProduct.client || '',
    updatedProduct.company || '',
  ];
  
  await sheets.spreadsheets.values.update({
    spreadsheetId: sheetId,
    range: `Sheet1!A${rowNumber}:G${rowNumber}`,
    valueInputOption: 'RAW',
    requestBody: {
      values: [row],
    },
  });

  return updatedProduct;
}

export async function deleteProduct(sheetId: string, productId: string): Promise<boolean> {
  const products = await getProducts(sheetId);
  const productIndex = products.findIndex(p => p.id === productId);
  
  if (productIndex === -1) {
    return false;
  }

  // Get all data and filter out the deleted product
  const updatedProducts = products.filter(p => p.id !== productId);
  
  // Clear the sheet and rewrite with updated data
  const sheets = await getGoogleSheetClient();
  
  // Clear all data except header
  await sheets.spreadsheets.values.clear({
    spreadsheetId: sheetId,
    range: 'Sheet1!A2:G',
  });

  // If there are remaining products, write them back
  if (updatedProducts.length > 0) {
    const rows = updatedProducts.map(p => [
      p.id,
      p.name,
      p.sku,
      p.quantity.toString(),
      p.price.toString(),
      p.client || '',
      p.company || '',
    ]);

    await sheets.spreadsheets.values.update({
      spreadsheetId: sheetId,
      range: 'Sheet1!A2:G',
      valueInputOption: 'RAW',
      requestBody: {
        values: rows,
      },
    });
  }

  return true;
}
