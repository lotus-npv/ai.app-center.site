import React, { useState, useRef } from "react"
import img from "../../assets/images/login/header-img.png"
import { InputText } from "primereact/inputtext"
import { Button } from "primereact/button"
import { Stepper } from "primereact/stepper"
import { StepperPanel } from "primereact/stepperpanel"
import { ProgressSpinner } from "primereact/progressspinner"

// //redux
import { useSelector, useDispatch, shallowEqual } from "react-redux"
import { getKeyLicenseId } from "store/actions"


function License() {
  const stepperRef = useRef(null)
  const [key, setKey] = useState('')
  const dispatch = useDispatch();

  const dataKey = useSelector(state => state.KeyLicense.data);

  // const {keyData} = useSelector(state => ({
  //   keyData: state.KeyLicense.data
  // }))
  const handleCheckKey = () => {
    dispatch(getKeyLicenseId(key));

  }

  console.log(dataKey);

  return (
    <div className="flex align-items-center justify-content-center">
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
              <Stepper linear ref={stepperRef} style={{ flexBasis: "10rem" }}>
                <StepperPanel header="Enter Key">
                  <div className="flex flex-column h-12rem">
                    <div className="surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">
                      <div className="card flex justify-content-center">
                        <span className="p-float-label">
                          <InputText
                            id="key"
                            value={key}
                            onChange={(e) => {
                              setKey(e.target.value);
                            }}
                            style={{ minWidth: "400px" }}
                          />
                          <label htmlFor="key">Enter key here</label>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex pt-4 justify-content-center">
                    <Button
                      label="Check"
                      icon="pi pi-arrow-right"
                      iconPos="right"
                      // onClick={() => stepperRef.current.nextCallback()}
                      onClick={handleCheckKey}
                    />
                  </div>
                </StepperPanel>

                <StepperPanel header="Check">
                  <div className="flex flex-column h-12rem">
                    <div className="surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">
                      <ProgressSpinner
                        style={{ width: "50px", height: "50px" }}
                        strokeWidth="8"
                        fill="var(--surface-ground)"
                        animationDuration=".5s"
                      />
                    </div>
                  </div>
                  <div className="flex pt-4 justify-content-between">
                    <Button
                      label="Back"
                      severity="secondary"
                      icon="pi pi-arrow-left"
                      onClick={() => stepperRef.current.prevCallback()}
                    />
                  </div>
                </StepperPanel>

                <StepperPanel header="Done">
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
