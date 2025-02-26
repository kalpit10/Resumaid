import React from "react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
const { TextArea } = Input;

function ExperienceProjects() {
  return (
    <div>
      <h5>
        <b>Work Experience</b>
      </h5>
      <hr />
      <Form.List name="experience">
        {(fields, { add, remove }) => (
          <>
            <div className="row">
              {fields.map(({ key, name, label, ...restField }) => (
                <div key={key} className="row gx-2 mb-3">
                  {" "}
                  {/* Added Bootstrap Row & Spacing */}
                  {/* Designation */}
                  <div className="col-12 col-md-6 col-lg-3">
                    <Form.Item
                      {...restField}
                      name={[name, "designation"]}
                      label="Designation"
                      rules={[
                        {
                          required: true,
                          message: "Missing Designation",
                        },
                      ]}
                    >
                      <Input placeholder="Designation" />
                    </Form.Item>
                  </div>
                  {/* Company Name */}
                  <div className="col-12 col-md-6 col-lg-3">
                    <Form.Item
                      {...restField}
                      name={[name, "company"]}
                      label="Company Name"
                      rules={[
                        {
                          required: true,
                          message: "Missing Company",
                        },
                      ]}
                    >
                      <Input placeholder="Company" />
                    </Form.Item>
                  </div>
                  {/* Address */}
                  <div className="col-12 col-md-6 col-lg-3">
                    <Form.Item
                      {...restField}
                      name={[name, "place"]}
                      label="Company Address"
                      rules={[
                        {
                          required: true,
                          message: "Missing Address",
                        },
                      ]}
                    >
                      <Input placeholder="Place" />
                    </Form.Item>
                  </div>
                  {/* Year Range */}
                  <div className="col-12 col-md-6 col-lg-3">
                    <Form.Item
                      {...restField}
                      name={[name, "range"]}
                      label="Year Range"
                      rules={[
                        {
                          required: true,
                          message: "Missing Year Range",
                        },
                      ]}
                    >
                      <Input placeholder="Year Range" />
                    </Form.Item>
                  </div>
                  {/* Work Description (Full Width) */}
                  <div className="col-12">
                    <Form.Item
                      {...restField}
                      name={[name, "description"]}
                      label="Work Experience Description"
                      rules={[
                        {
                          required: true,
                          message: "Missing Description",
                        },
                      ]}
                    >
                      <TextArea placeholder="Work Experience Description" />
                    </Form.Item>
                  </div>
                  {/* Remove Button (Centered) */}
                  <div className="col-12 d-flex justify-content-end">
                    <MinusCircleOutlined
                      style={{
                        fontSize: 23,
                        color: "tomato",
                        cursor: "pointer",
                      }}
                      onClick={() => remove(name)}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Add Experience Button */}
            <Form.Item className="text-center">
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                Add Experience
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>

      <h5>
        <b>Projects</b>
      </h5>
      <hr />
      <Form.List name="projects">
        {(fields, { add, remove }) => (
          <>
            <div className="row">
              {fields.map(({ key, name, label, ...restField }) => (
                <>
                  <div className="col-md-3">
                    <Form.Item
                      {...restField}
                      name={[name, "title"]}
                      label={[label, "Project Title"]}
                      rules={[
                        {
                          required: true,
                          message: "Missing title",
                        },
                      ]}
                    >
                      <Input placeholder="Project Title" />
                    </Form.Item>
                  </div>

                  <div className="col-md-5">
                    <Form.Item
                      {...restField}
                      name={[name, "description"]}
                      label={[label, "Project Description"]}
                      rules={[
                        {
                          required: true,
                          message: "Missing description",
                        },
                      ]}
                    >
                      <TextArea placeholder="Project Description" />
                    </Form.Item>
                  </div>

                  <div className="col-md-2">
                    <MinusCircleOutlined
                      style={{ fontSize: 23, color: "tomato" }}
                      onClick={() => remove(name)}
                    />
                  </div>
                </>
              ))}
            </div>
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                Add Project
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </div>
  );
}

export default ExperienceProjects;
