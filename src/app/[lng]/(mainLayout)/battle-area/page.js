'use client'

import Btn from "@/Elements/Buttons/Btn"
import { useCallback, useState, useContext } from "react"
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap"
import axios from "axios"
import CartContext from "@/Helper/CartContext"

const API_KEY = "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";

const BattleArea = () => {
    const { cartProducts } = useContext(CartContext);
    const [dropdown1, setDropdown1] = useState(false);
    const [dropdown2, setDropdown2] = useState(false);
    const [dropdown3, setDropdown3] = useState(false);
    const [prompt, setPrompt] = useState("");
    const [answer, setAnswer] = useState({
        dropdown1: "",
        dropdown2: "",
        dropdown3: ""
    });

    const toggle1 = () => setDropdown1((prevState) => !prevState);
    const toggle2 = () => setDropdown2((prevState) => !prevState);
    const toggle3 = () => setDropdown3((prevState) => !prevState);

    const [selectedSupermind, setSelectedSupermind] = useState({
        dropdown1: {name: "", api: ""},
        dropdown2: {name: "", api: ""},
        dropdown3: {name: "", api: ""}
    })

    const handleChangePrompt = (e) => {
        setPrompt(e.target.value)
    }

    const handleClearPrompt = useCallback(() => {
        setPrompt("")
        setAnswer({
            dropdown1: "",
            dropdown2: "",
            dropdown3: ""
        })
    }, [setPrompt])

    const handleOnEnterPress = (e) => {
        if(e.ctrlKey && e.keyCode === 13) {
            handleSubmitPrompt();
        }
    }

    const handleSubmitPrompt = useCallback(async () => {
        if(!prompt) {
            alert("Please enter your prompt!");
            return;
        }
        if(selectedSupermind.dropdown1.api === "" && selectedSupermind.dropdown2.api === "" && selectedSupermind.dropdown3.api === "") {
            alert("Please select at least one supermind.")
            return;
        }
        const superminds = [
            {api: selectedSupermind.dropdown1.api, dropdown: "dropdown1"},
            {api: selectedSupermind.dropdown2.api, dropdown: "dropdown2"},
            {api: selectedSupermind.dropdown3.api, dropdown: "dropdown3"}
        ]
        await Promise.all(superminds.map(async (supermind) => {
            // try {
            const requestBody = {
                model: 'gpt-3.5-turbo',
                messages: [
                    {
                    role: 'user',
                    content: prompt
                    }
                ]
            };

            if(supermind.api.includes("http")) {
                axios.post(supermind.api, requestBody, {
                    headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${API_KEY}`
                    }
                }).then(response => {
                    setAnswer(prev => ({...prev, [supermind.dropdown]: response.data.choices[0].message.content.trim()}));
                }).catch(error => {
                    setAnswer(prev => ({...prev, [supermind.dropdown]: 'Error fetching response. Please try again.'}));
                });
            } else {
                if (supermind.name) {
                    setAnswer(prev => ({...prev, [supermind.dropdown]: 'Api url is invalid now. Please try again.'}));
                } else {
                    setAnswer(prev => ({...prev, [supermind.dropdown]: 'Please select supermind that you want to test.'}));
                }
            }
        }))
        // const apiUrl = 'https://api.openai.com/v1/chat/completions'; // Endpoint for GPT-3 completions
    }, [prompt, selectedSupermind])

    console.log(cartProducts, "lskdflksdjfjlskdfjlk")

    const handleOnSelectSupermind = (name, api, dropdownId) => () => {
        setSelectedSupermind(prev => {
            return {
                ...prev,
                [dropdownId]: {name, api}
            }
        })
    }

    return (
        <div className="m-auto p-3 w-50 d-flex border " style={{height: '650px'}}>
            <div className="w-25 border-end pe-3">
                <div className="fs-3 fw-bold">Prompt</div>
                <textarea onChange={handleChangePrompt} onKeyDown={handleOnEnterPress} value={prompt} placeholder="Enter your prompt" className="w-100 border border-white" style={{resize: "none", height: "calc(100% - 90px)"}}></textarea>
                <div className="d-flex w-100 justify-content-center">
                    <Btn
                        className='btn-md add-button border me-3'
                        title={'Run'}
                        onClick={handleSubmitPrompt}>
                    </Btn>
                    <Btn
                        className='btn-md add-button border'
                        title={'Clear'}
                        onClick={handleClearPrompt}>
                    </Btn>
                </div>
            </div>
            <div className="w-75 ps-3 h-100 d-flex flex-column justify-content-between">
                <div style={{height: "33%"}}>
                    <Dropdown isOpen={dropdown1} toggle={toggle1}>
                        <DropdownToggle caret className='select-dropdown' type='button' size="sm">
                            {selectedSupermind.dropdown1.name ? selectedSupermind.dropdown1.name : "Select Supermind...."}
                        </DropdownToggle>
                        {<DropdownMenu className='dropdown-menu-end sm-dropdown-menu'>
                            {cartProducts && cartProducts.length >0 && cartProducts.map((item, index) => (
                                <DropdownItem id={`${item.product.name}${index}-1`} key={`${item.product.name}${index}-1`} onClick={handleOnSelectSupermind(item.product.name, item.product.api_url, "dropdown1")}>
                                    {item.product.name}
                                </DropdownItem>
                            ))}
                        </DropdownMenu>}
                    </Dropdown>
                    <div className="border p-2" style={{height: "calc(100% - 37px)", overflowY: "auto", overflowWrap: "anywhere"}}>
                        {answer.dropdown1}
                    </div>
                </div>
                <div style={{height: "33%"}}>
                    <Dropdown isOpen={dropdown2} toggle={toggle2}>
                        <DropdownToggle caret className='select-dropdown' type='button' size="sm">
                            {selectedSupermind.dropdown2.name ? selectedSupermind.dropdown2.name : "Select Supermind...."}
                        </DropdownToggle>
                        <DropdownMenu className='dropdown-menu-end sm-dropdown-menu'>
                            {cartProducts && cartProducts.length >0 && cartProducts.map((item, index) => (
                                <DropdownItem id={`${item.product.name}${index}-2`} key={`${item.product.name}${index}-2`} onClick={handleOnSelectSupermind(item.product.name, item.product.api_url, "dropdown2")}>
                                    {item.product.name}
                                </DropdownItem>
                            ))}
                        </DropdownMenu>
                    </Dropdown>
                    <div className="border p-2" style={{height: "calc(100% - 37px)", overflowY: "auto", overflowWrap: "anywhere"}}>
                        {answer.dropdown2}
                    </div>
                </div>
                <div style={{height: "33%"}}>
                    <Dropdown isOpen={dropdown3} toggle={toggle3}>
                        <DropdownToggle caret className='select-dropdown' type='button' size="sm">
                            {selectedSupermind.dropdown3.name ? selectedSupermind.dropdown3.name : "Select Supermind...."}
                        </DropdownToggle>
                        <DropdownMenu className='dropdown-menu-end sm-dropdown-menu'>
                            {cartProducts && cartProducts.length >0 && cartProducts.map((item, index) => (
                                <DropdownItem id={`${item.product.name}${index}-3`} key={`${item.product.name}${index}-3`} onClick={handleOnSelectSupermind(item.product.name, item.product.api_url, "dropdown3")}>
                                    {item.product.name}
                                </DropdownItem>
                            ))}
                        </DropdownMenu>
                    </Dropdown>
                    <div className="border p-2" style={{height: "calc(100% - 37px)", overflowY: "auto", overflowWrap: "anywhere"}}>
                        {answer.dropdown3}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BattleArea