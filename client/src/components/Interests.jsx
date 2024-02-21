import React from "react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
const { TextArea } = Input;

function ExperienceProjects() {
  return (
    <div>
      <h5>
        <b>Co-curricular</b>
      </h5>
      <hr />
      <Form.List name="cocurricular">
        {(fields, { add, remove }) => (
          <>
            <div className="row">
              {fields.map(({ key, name, label, ...restField }) => (
                <>
                  <div className="col-md-3">
                    <Form.Item
                      {...restField}
                      name={[name, "activity"]}
                      label={[label, "Activity"]}
                      rules={[
                        {
                          required: true,
                          message: "Missing activity",
                        },
                      ]}
                    >
                      <Input placeholder="Activity" />
                    </Form.Item>
                  </div>

                  <div className="col-md-5">
                    <Form.Item
                      {...restField}
                      name={[name, "description"]}
                      label={[label, "Activity description"]}
                      rules={[
                        {
                          required: true,
                          message: "Missing description",
                        },
                      ]}
                    >
                      <TextArea placeholder="Description" />
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
                Add Co-curricular
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>

      <h5>
        <b>Interests</b>
      </h5>
      <hr />
      <Form.List name="interests">
        {(fields, { add, remove }) => (
          <>
            <div className="row">
              {fields.map(({ key, name, label, ...restField }) => (
                <>
                  <div className="col-md-3">
                    <Form.Item
                      {...restField}
                      name={[name, "interests"]}
                      label={[label, "Interests"]}
                      rules={[
                        {
                          required: true,
                          message: "Missing Interests",
                        },
                      ]}
                    >
                      <Input placeholder="Interests" />
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
                Add Interests
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </div>
  );
}

export default ExperienceProjects;
