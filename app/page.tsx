// app/page.tsx
import Content from './components/Content';
import LoginWithPrivy from './components/LoginWithPrivy';

export default function HomePage() {
  return (
    <main>
      <div className="page-container flex flex-col gap-1">
        <LoginWithPrivy />
        <Content />
      </div>
    </main>
  );
}