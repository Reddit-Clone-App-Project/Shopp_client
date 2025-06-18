import { useState } from "react";
import LandingForm from "../features/CreateStore/LandingForm";

const CreateStorePage = () => {
    const [step, SetStep] = useState(1);

    const goNext = () => SetStep(prev => prev + 1);
    const goBack = () => SetStep(prev => prev - 1);

    return (
        <div>
            {step === 1 && <LandingForm onNext={goNext} />}
        </div>
    );
};

export default CreateStorePage;