import React from "react";
import { Form, Input } from "antd";
const {TextArea} = Input

function Personalinfo(){
    return(
        <div>
            <div className="row">
                <div className="col-md-4">
                    <Form.Item name="firstname" label="First Name" rules={[{required:true}]}>
                        <Input/>
                    </Form.Item>
                </div>
                <div className="col-md-4">
                    <Form.Item name="lastname" label="Last Name" rules={[{required:true}]}>
                        <Input/>
                    </Form.Item>
                </div>
                <div className="col-md-4">
                    <Form.Item name="email" label="Email" rules={[{required:true}]}>
                        <Input/>
                    </Form.Item>
                </div>
                <div className="col-md-4">
                    <Form.Item name="mobileNumber" label="Mobile Number" rules={[{required:true}]}>
                        <Input/>
                    </Form.Item>
                </div>
                <div className="col-md-4">
                    <Form.Item name="portfolio" label="Portfolio" rules={[{required:true}]}>
                        <Input/>
                    </Form.Item>
                </div>

                <div className="col-md-12">
                    <Form.Item name="objective" label="Objective" rules={[{required:true}]}>
                        <TextArea/>
                    </Form.Item>
                </div>

                <div className="col-md-12">
                    <Form.Item name="address" label="Address" rules={[{required:true}]}>
                        <TextArea/>
                    </Form.Item>
                </div>
            </div>
        </div>
    )
}

export default Personalinfo
