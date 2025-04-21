function Loader() {
  return (
    <div className="flex justify-center items-center w-full min-h-[200px]">
      <div className="flex items-center justify-center gap-2">
        <div className="w-3 h-3 rounded-full bg-primary animate-bounce" style={{ animationDelay: '-0.3s' }}></div>
        <div className="w-3 h-3 rounded-full bg-primary animate-bounce" style={{ animationDelay: '-0.15s' }}></div>
        <div className="w-3 h-3 rounded-full bg-primary animate-bounce"></div>
      </div>
    </div>
  )
}

export default Loader