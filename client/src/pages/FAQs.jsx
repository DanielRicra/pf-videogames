import { useState } from "react"

const FAQs = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const handleAccordionClick = (index) => {
        setActiveIndex(index === activeIndex ? null : index);
    };

    return (
        <>
            <div className="border-[1rem] p-[5rem] my-[3rem] mb-[5rem] mx-[7rem] rounded-[2rem]">
                <h1 className="flex text-[3.5rem] my-[1rem] mb-[4rem] justify-center font-bold">
                    Frequently asked questions
                </h1>

                <div className="accordion text-black">
                    <div className="accordion-item">
                        <div
                            className={`accordion-title ${activeIndex === 0 ? "active" : ""
                                }`}
                            onClick={() => handleAccordionClick(0)}
                        >
                            What is the purpose of this project?
                        </div>
                        <div
                            className={`accordion-content ${activeIndex === 0 ? "open" : ""
                                }`}
                        >
                            This website is the final project for a bootcamp called Henry, it's also the last requirement to approve and finish it.
                        </div>
                    </div>

                    <div className="accordion-item">
                        <div
                            className={`accordion-title ${activeIndex === 1 ? "active" : ""
                                }`}
                            onClick={() => handleAccordionClick(1)}
                        >
                            How can i contact you?
                        </div>
                        <div
                            className={`accordion-content ${activeIndex === 1 ? "open" : ""
                                }`}
                        >
                            Click below on "About us" and you will see a presentation, click on the buttons and they will redirect you to our LinkedIn and GitHub profiles.
                        </div>
                    </div>

                    <div className="accordion-item">
                        <div
                            className={`accordion-title ${activeIndex === 2 ? "active" : ""
                                }`}
                            onClick={() => handleAccordionClick(2)}
                        >
                            If I buy a game on this page, can I play them?
                        </div>
                        <div
                            className={`accordion-content ${activeIndex === 2 ? "open" : ""
                                }`}
                        >
                            No 👍 we are just showing the skills that we have as developers.
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FAQs;
