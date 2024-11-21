// app/about/layout.tsx
export default function AboutLayout({ 
    children, 
}: { 
    children: React.ReactNode 
}) {
    return (
      <>
      <div className="flex-grow">{children}</div>
      </>
    )
  }
  