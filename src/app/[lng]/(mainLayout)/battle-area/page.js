'use client'

import Btn from "@/Elements/Buttons/Btn"
import { useCallback, useState } from "react"
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap"
import axios from "axios"
import { ProductAPI } from "@/Utils/AxiosUtils/API"
import { useQuery } from "@tanstack/react-query"

const API_KEY = "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";

const BattleArea = () => {
    const [dropdown1, setDropdown1] = useState(false);
    const [dropdown2, setDropdown2] = useState(false);
    const [dropdown3, setDropdown3] = useState(false);
    const [prompt, setPrompt] = useState("");
    const [answer, setAnswer] = useState("");

    const toggle1 = () => setDropdown1((prevState) => !prevState);
    const toggle2 = () => setDropdown2((prevState) => !prevState);
    const toggle3 = () => setDropdown3((prevState) => !prevState);

    const { products, fetchStatus } = useQuery(
        [],
        () =>
          request({
            url: ProductAPI,
            params: {
              page: 1,
              status: 1,
              paginate: 40,
              field: '',
              price: '',
              category: '',
              sort: '',
              sortBy: '',
              rating: '',
              attribute: '',
              store_slug: null,
            },
          }),
        {
          enabled: true,
          refetchOnWindowFocus: false,
          select: (data) => data.data,
        },
    );

    const handleChangePrompt = (e) => {
        setPrompt(e.target.value)
    }

    const handleClearPrompt = useCallback(() => {
        setPrompt("")
        setAnswer("")
    }, [setPrompt])

    const handleOnEnterPress = (e) => {
        if(e.ctrlKey && e.keyCode === 13) {
            handleSubmitPrompt();
        }
    }

    const handleSubmitPrompt = useCallback(async () => {
        try {
        const apiUrl = 'https://api.openai.com/v1/chat/completions'; // Endpoint for GPT-3 completions
        const requestBody = {
            model: 'gpt-3.5-turbo',
            messages: [
                {
                  role: 'user',
                  content: prompt
                }
            ]
        };

        const response = await axios.post(apiUrl, requestBody, {
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`
            }
        });

            setAnswer(response.data.choices[0].message.content.trim());
        } catch (error) {
            console.error('Error fetching response:', error);
            setAnswer('Error fetching response. Please try again.');
        }
    }, [prompt])

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
                            Select Supermind....
                        </DropdownToggle>
                        <DropdownMenu className='dropdown-menu-end sm-dropdown-menu'>
                            <DropdownItem id={1} key={1} onClick={() => {}}>
                                sdfsdsad
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                    <div className="border p-2" style={{height: "calc(100% - 37px)", overflowY: "auto", overflowWrap: "anywhere"}}>
                        {answer}
                    </div>
                </div>
                <div style={{height: "33%"}}>
                    <Dropdown isOpen={dropdown2} toggle={toggle2}>
                        <DropdownToggle caret className='select-dropdown' type='button' size="sm">
                            Select Supermind....
                        </DropdownToggle>
                        <DropdownMenu className='dropdown-menu-end sm-dropdown-menu'>
                            <DropdownItem id={1} key={1} onClick={() => {}}>
                                sdfsdsad
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                    <div className="border p-2" style={{height: "calc(100% - 37px)", overflowY: "auto", overflowWrap: "anywhere"}}>
                        {answer}
                    </div>
                </div>
                <div style={{height: "33%"}}>
                    <Dropdown isOpen={dropdown3} toggle={toggle3}>
                        <DropdownToggle caret className='select-dropdown' type='button' size="sm">
                            Select Supermind....
                        </DropdownToggle>
                        <DropdownMenu className='dropdown-menu-end sm-dropdown-menu'>
                            <DropdownItem id={1} key={1} onClick={() => {}}>
                                sdfsdsad
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                    <div className="border p-2" style={{height: "calc(100% - 37px)", overflowY: "auto", overflowWrap: "anywhere"}}>
                        {answer}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BattleArea