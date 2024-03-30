import React, { useState, useRef } from "react"
import { Steps } from "primereact/steps"
import img from "../../assets/images/login/header-img.png"
import { InputText } from "primereact/inputtext"
import { Button } from "primereact/button"
import { Stepper } from 'primereact/stepper';
import { StepperPanel } from 'primereact/stepperpanel';

function License() {
    const stepperRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(0)

  const itemRenderer = (item, itemIndex) => {
    const isActiveItem = activeIndex === itemIndex
    const backgroundColor = isActiveItem
      ? "var(--primary-color)"
      : "var(--surface-b)"
    const textColor = isActiveItem
      ? "var(--surface-b)"
      : "var(--text-color-secondary)"

    return (
      <span
        className="inline-flex align-items-center justify-content-center align-items-center border-circle border-primary border-1 h-3rem w-3rem z-1 cursor-pointer"
        style={{
          backgroundColor: backgroundColor,
          color: textColor,
          marginTop: "-25px",
        }}
        onClick={() => setActiveIndex(itemIndex)}
      >
        <i className={`${item.icon} text-xl`} />
      </span>
    )
  }

  const items = [
    {
      icon: "pi pi-pencil",
      template: item => itemRenderer(item, 0),
    },
    {
      icon: "pi pi-info",
      template: item => itemRenderer(item, 1),
    },
    {
      icon: "pi pi-check",
      template: item => itemRenderer(item, 2),
    },
  ]

  return (
    <div className="flex align-items-center justify-content-center" >
      <div className="w-12 md:w-6 lg:w-5 xl:w-4 mt-8">
        <div className="shadow-1 surface-50 border-round-sm">
          <div className="flex justify-content-between bg-primary-subtle border-round-top-sm">
            <div className="align-content-center ml-5">
              <div className="font-bold text-2xl mb-2">Kích hoạt bản quyền</div>
              <div className="">Các bước kích hoạt bản quyền phần mềm</div>
            </div>
            <div>
              <img src={img} height={120} />
            </div>
          </div>

          <div className="p-5">
            <div className="card flex justify-content-center">
              <Stepper ref={stepperRef} style={{ flexBasis: "10rem" }}>
                <StepperPanel header="Header I">
                  <div className="flex flex-column h-12rem">
                    <div className="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">
                      Content I
                    </div>
                  </div>
                  <div className="flex pt-4 justify-content-end">
                    <Button
                      label="Next"
                      icon="pi pi-arrow-right"
                      iconPos="right"
                      onClick={() => stepperRef.current.nextCallback()}
                    />
                  </div>
                </StepperPanel>
                <StepperPanel header="Header II">
                  <div className="flex flex-column h-12rem">
                    <div className="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">
                      Content II
                    </div>
                  </div>
                  <div className="flex pt-4 justify-content-between">
                    <Button
                      label="Back"
                      severity="secondary"
                      icon="pi pi-arrow-left"
                      onClick={() => stepperRef.current.prevCallback()}
                    />
                    <Button
                      label="Next"
                      icon="pi pi-arrow-right"
                      iconPos="right"
                      onClick={() => stepperRef.current.nextCallback()}
                    />
                  </div>
                </StepperPanel>
                <StepperPanel header="Header III">
                  <div className="flex flex-column h-12rem">
                    <div className="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">
                      Content III
                    </div>
                  </div>
                  <div className="flex pt-4 justify-content-start">
                    <Button
                      label="Back"
                      severity="secondary"
                      icon="pi pi-arrow-left"
                      onClick={() => stepperRef.current.prevCallback()}
                    />
                  </div>
                </StepperPanel>
              </Stepper>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default License
