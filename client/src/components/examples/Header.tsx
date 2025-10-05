import { Header } from '../Header';

export default function HeaderExample() {
  return (
    <div>
      <Header 
        showMenuButton={true}
        onMenuClick={() => console.log('Menu clicked')}
      />
      <div className="p-6">
        <p className="text-muted-foreground">Conteúdo da página abaixo do header...</p>
      </div>
    </div>
  );
}
