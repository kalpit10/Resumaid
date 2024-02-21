import React, { useEffect, useState } from "react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, AutoComplete, Select } from "antd";
// const { Option } = Select;
// const { Option } = AutoComplete;

function SkillsEducation() {
  const [colleges, setColleges] = useState([]);
  const [value, setValue] = useState("");
  const [options, setOptions] = useState(colleges);

  const qualification = [
    {
      label: "Under-graduate",
      value: "undergraduate",
    },
    {
      label: "Post-graduate",
      value: "postgraduate",
    },
    {
      label: "Diploma",
      value: "diploma",
    },
  ];

  const handleSearch = (searchText) => {
    if (searchText) {
      const filteredOptions = colleges.filter((college) =>
        college.name.toLowerCase().includes(searchText.toLowerCase())
      );
      setOptions(filteredOptions);
    } else {
      setOptions(colleges);
    }
  };

  const handleSelect = (selectedValue) => {
    setValue(selectedValue);
  };

  const handleInputChange = (inputValue) => {
    setValue(inputValue);
  };

  useEffect(() => {
    // fetch("http://localhost:5000/colleges")
    fetch("https://resumaid.herokuapp.com/colleges")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setColleges(data);
      })
      .catch((error) => {
        console.error("Error fetching colleges:", error);
      });
  }, []);
  return (
    <div>
      <h5>
        <b>Education</b>
      </h5>
      <hr />
      <Form.List name="education">
        {(fields, { add, remove }) => (
          <>
            <div className="row">
              {fields.map(({key, name, label, ...restField }) => (
                <>
                  <div className="col-md-2">
                    <Form.Item
                      {...restField}
                      name={[name, "qualification"]}
                      label={[label, "Qualification"]}
                      rules={[
                        {
                          required: true,
                          message: "Missing qualification",
                        },
                      ]}
                    >
                      <Select
                        options={qualification}
                        placeholder="Qualification"
                      />
                    </Form.Item>
                  </div>
                  <div className="col-md-3">
                    <Form.Item
                      {...restField}
                      name={[name, "course"]}
                      label={[label, "Course"]}
                      rules={[
                        {
                          required: true,
                          message: "Missing course",
                        },
                      ]}
                    >
                      <Input placeholder="Course" />
                    </Form.Item>
                  </div>
                  <div className="col-md-1">
                    <Form.Item
                      {...restField}
                      name={[name, "percentage"]}
                      label={[label, "Percentage"]}
                      rules={[
                        {
                          required: true,
                          message: "Missing percentage",
                        },
                      ]}
                    >
                      <Input placeholder="Percentage" />
                    </Form.Item>
                  </div>
                  <div className="col-md-2">
                    <Form.Item
                      {...restField}
                      name={[name, "institution"]}
                      label={[label, "Institution name"]}
                      rules={[
                        {
                          required: true,
                          message: "Missing institution",
                        },
                      ]}
                    >
                      <AutoComplete
                        value={value}
                        options={options.map((college) => ({
                          value: college.name,
                          label: college.name,
                        }))}
                        placeholder="Type your college name"
                        onSelect={handleSelect}
                        onSearch={handleSearch}
                        onChange={handleInputChange}
                      ></AutoComplete>
                    </Form.Item>
                  </div>
                  <div className="col-md-2">
                    <Form.Item
                      {...restField}
                      name={[name, "range"]}
                      label={[label, "Year Range"]}
                      rules={[
                        {
                          required: true,
                          message: "Missing year range",
                        },
                      ]}
                    >
                      <Input placeholder="Year Range" />
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
                Add Education
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>

      <h5>
        <b>Skills</b>
      </h5>
      <hr />
      <Form.List name="skills">
        {(fields, { add, remove }) => (
          <>
            <div className="row">
              {fields.map(({ key, name, ...restField }) => (
                <>
                  <div className="col-md-4">
                    <Form.Item
                      {...restField}
                      name={[name, "technology"]}
                      rules={[
                        {
                          required: true,
                          message: "Missing technology",
                        },
                      ]}
                    >
                      <Input placeholder="Technology" />
                    </Form.Item>
                  </div>

                  <div className="col-md-4">
                    <Form.Item
                      {...restField}
                      name={[name, "rating"]}
                      rules={[
                        {
                          required: true,
                          message: "Missing rating",
                        },
                      ]}
                    >
                      <Input placeholder="Rating" />
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
                Add Skill
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </div>
  );
}

export default SkillsEducation;
