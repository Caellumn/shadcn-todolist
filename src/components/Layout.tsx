import { ModeToggle } from "@/components/mode-toggle";
import { Toaster } from "@/components/ui/sonner";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="px-auto mx-auto max-w-5xl space-y-8">
        <div className="flex items-center justify-between">
          <h1>Todo App</h1> <ModeToggle />
        </div>
        {children}
        <Toaster />
      </div>
    </>
  );
};
export default Layout;
