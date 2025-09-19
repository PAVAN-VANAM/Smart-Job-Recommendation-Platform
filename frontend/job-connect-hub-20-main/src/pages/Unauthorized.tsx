import { Link } from "react-router-dom";
import { ShieldOff } from "lucide-react";

const Unauthorized = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center p-8 bg-card rounded-lg shadow-card">
        <ShieldOff className="h-16 w-16 text-destructive mx-auto mb-6" />
        <h1 className="mb-4 text-4xl font-bold text-foreground">Access Denied</h1>
        <p className="mb-6 text-xl text-muted-foreground">
          You do not have permission to view this page.
        </p>
        <Link to="/" className="text-primary underline hover:text-primary/80">
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;