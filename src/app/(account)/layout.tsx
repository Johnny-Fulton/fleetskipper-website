// app/(account)/layout.tsx
export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // TODO: Add auth check here
  // const session = await getSession();
  // if (!session) redirect('/login');
  
  return <>{children}</>;
}