export const AiDisclaimer = () => {
  return (
    <div className="border border-rose-300 bg-rose-50 text-rose-700 p-4 my-4 rounded flex justify-between items-center">
      <span>Please note that this text has been personalized by AI and might contain mistakes.</span>
      <button className="text-rose-500 font-bold">x</button> {/* TODO Make it so that this can actually be closed. */}
    </div>
  )
}