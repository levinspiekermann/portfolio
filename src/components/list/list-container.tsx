export default function ListContainer({ children }: { children: React.ReactNode }) {
  return ( 
    <div className="grid grid-cols-12 gap-[2rem]">
      {children}
    </div>
  )
}
