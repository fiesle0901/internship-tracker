import type { JSX } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({
  children,
}: {
  children: JSX.Element;
}) {
  const { token, isGuest, isLoading } = useAuth();

  if (isLoading) return null;

  if (!token && !isGuest) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
