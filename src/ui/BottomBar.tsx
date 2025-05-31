export default function BottomBar() {
  return (
    <div className="flex justify-between items-end absolute bottom-0 w-screen px-[24px]">
      <img
        src="/debate-society-logo.png"
        alt="Debate Society Logo"
        className="h-30 xl:h-36 mb-4"
      />
      <img src="/iald-logo.png" alt="IALD Logo" className="h-30 mb-4" />
    </div>
  );
}
