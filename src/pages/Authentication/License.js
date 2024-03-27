import React, { useState } from 'react';
import { Steps } from 'primereact/steps';
import img from '../../assets/images/login/header-img.png'
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';



function License() {

    const [activeIndex, setActiveIndex] = useState(0);

    const itemRenderer = (item, itemIndex) => {
        const isActiveItem = activeIndex === itemIndex;
        const backgroundColor = isActiveItem ? 'var(--primary-color)' : 'var(--surface-b)';
        const textColor = isActiveItem ? 'var(--surface-b)' : 'var(--text-color-secondary)';

        return (
            <span
                className="inline-flex align-items-center justify-content-center align-items-center border-circle border-primary border-1 h-3rem w-3rem z-1 cursor-pointer"
                style={{ backgroundColor: backgroundColor, color: textColor, marginTop: '-25px' }}
                onClick={() => setActiveIndex(itemIndex)}
            >
                <i className={`${item.icon} text-xl`} />
            </span>
        );
    };

    const items = [
        {
            icon: 'pi pi-pencil',
            template: (item) => itemRenderer(item, 0)
        },
        {
            icon: 'pi pi-info',
            template: (item) => itemRenderer(item, 1)
        },
        {
            icon: 'pi pi-check',
            template: (item) => itemRenderer(item, 2)
        }
    ];

    return (
        <div className='flex align-items-center justify-content-center'>
            <div className='w-12 md:w-6 lg:w-5 xl:w-4 mt-8'>
                <div className='shadow-1 surface-50 border-round-sm'>
                    <div className='flex justify-content-between bg-green-300 border-round-top-sm'>
                        <div className='align-content-center ml-5'>
                            <div className='font-bold text-2xl mb-2'>
                                Kích hoạt bản quyền
                            </div>
                            <div className=''>
                                Các bước kích hoạt bản quyền phần mềm
                            </div>
                        </div>
                        <div>
                            <img src={img} height={120} />
                        </div>
                    </div>

                    <div className='p-5'>
                        <div className="card mb-6">
                            <Steps model={items} activeIndex={activeIndex} readOnly={false} className="m-2 pt-4" />
                        </div>
                        <div className='p-inputtext-lg'>
                            <InputText id="email" type="text" placeholder="Nhập mã kích hoạt" className="w-full mb-5 text-center" />
                        </div>
                        <div>
                            <Button label="Kiểm tra" className='w-full' severity="success" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default License;