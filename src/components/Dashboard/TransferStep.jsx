function TransferStep({ currentStep }) {
  const getStep = (stepNumber) =>
    currentStep === stepNumber
      ? "bg-blue-600 text-white"
      : "bg-gray-400 text-white";

  const getText = (stepNumber) =>
    currentStep === stepNumber
      ? "text-blue-600"
      : "text-gray-500";

  return (
    <div className="flex items-center gap-4 mb-6">
      <div className="flex items-center gap-3">
        <div className={`w-8 h-8 flex items-center justify-center rounded-full ${getStep(1)}`}>1</div>
        <p className={getText(1)}>Find People</p>
      </div>

      <div className="flex-1 border-t-2 border-dashed border-gray-300"></div>

      <div className="flex items-center gap-3">
        <div className={`w-8 h-8 flex items-center justify-center rounded-full ${getStep(2)}`}>2</div>
        <p className={getText(2)}>Set Nominal</p>
      </div>

      <div className="flex-1 border-t-2 border-dashed border-gray-300"></div>

      <div className="flex items-center gap-3">
        <div className={`w-8 h-8 flex items-center justify-center rounded-full ${getStep(3)}`}>3</div>
        <p className={getText(3)}>Finish</p>
      </div>
    </div>
  );
}

export default TransferStep