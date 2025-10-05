import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { updateSheetIdSchema } from "@shared/schema";
import * as googleSheets from "./googleSheets";

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup authentication
  await setupAuth(app);

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Sheet ID routes
  app.post('/api/user/sheet', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { sheetId } = updateSheetIdSchema.parse(req.body);
      
      // Update user's sheet ID
      const user = await storage.updateUserSheetId(userId, sheetId);
      res.json(user);
    } catch (error: any) {
      console.error("Error updating sheet ID:", error);
      res.status(400).json({ message: error.message || "Failed to update sheet ID" });
    }
  });

  // Product routes
  app.get('/api/products', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      
      if (!user?.sheetId) {
        return res.status(400).json({ message: "No sheet ID configured" });
      }

      const products = await googleSheets.getProducts(user.sheetId);
      res.json(products);
    } catch (error: any) {
      console.error("Error fetching products:", error);
      res.status(500).json({ message: error.message || "Failed to fetch products" });
    }
  });

  app.post('/api/products', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      
      if (!user?.sheetId) {
        return res.status(400).json({ message: "No sheet ID configured" });
      }

      const { name, sku, quantity, price, client, company } = req.body;
      
      if (!name || !sku || quantity === undefined || price === undefined) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const product = await googleSheets.addProduct(user.sheetId, {
        name,
        sku,
        quantity: parseInt(quantity),
        price: parseFloat(price),
        client,
        company,
      });

      res.json(product);
    } catch (error: any) {
      console.error("Error adding product:", error);
      res.status(500).json({ message: error.message || "Failed to add product" });
    }
  });

  app.put('/api/products/:id', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      
      if (!user?.sheetId) {
        return res.status(400).json({ message: "No sheet ID configured" });
      }

      const { id } = req.params;
      const updates = req.body;

      const product = await googleSheets.updateProduct(user.sheetId, id, updates);
      
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.json(product);
    } catch (error: any) {
      console.error("Error updating product:", error);
      res.status(500).json({ message: error.message || "Failed to update product" });
    }
  });

  app.delete('/api/products/:id', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      
      if (!user?.sheetId) {
        return res.status(400).json({ message: "No sheet ID configured" });
      }

      const { id } = req.params;
      const success = await googleSheets.deleteProduct(user.sheetId, id);
      
      if (!success) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.json({ success: true });
    } catch (error: any) {
      console.error("Error deleting product:", error);
      res.status(500).json({ message: error.message || "Failed to delete product" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
