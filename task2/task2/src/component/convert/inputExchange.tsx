import React, { useEffect, useState } from "react";
import { Button, Form, Input, Select, Space, Table } from "antd";
import { IItemCoin, IOption, ITypeListCoins } from "../../types";
const { Option } = Select;
import "./index.scss";
import { ColumnsType } from "antd/es/table";
import { data } from "../../assets/mock";
const columns: ColumnsType<IItemCoin> = [
  {
    title: "#",
    dataIndex: "",
    render: (text, _, index) => index + 1,
    width: "10%",
  },
  {
    title: "Coin",
    dataIndex: "coin",
    render: (_, record) => {
      return (
        <div className="c-form_table-name">
          <img
            src={`https://cryptocompare.com/${record.CoinInfo.ImageUrl}`}
            alt={`https://cryptocompare.com/${record.CoinInfo.ImageUrl}`}
            style={{ width: "30px", marginRight: "8px" }}
          />
          <div className="c-form_table-name-coin">
            <h3>{record.CoinInfo.FullName}</h3>
            <h4>{record.CoinInfo.Name}</h4>
          </div>
        </div>
      );
    },
    width: "30%",
  },
  {
    title: "Price",
    render: (_, record) => {
      const trimmedText = record.ConversionInfo.RAW[0]
        .replace(record.ConversionInfo.SubsNeeded[0], "")
        .replace(/^~/, "")
        .replace(/~$/, "");
      const secondValue = trimmedText.split("~")[1];
      const parsedValue =
        Number(secondValue) > 1
          ? parseFloat(Number(secondValue).toFixed(2))
          : parseFloat(Number(secondValue).toFixed(7));
      return <p>${parsedValue}</p>;
    },
  },
  {
    title: "Last 7 Days",
    render: (_, record) => {
      return (
        <img
          src={`https://images.cryptocompare.com/sparkchart/${record.CoinInfo.Name}/USD/latest.png?ts=1715655600`}
          alt={`https://cryptocompare.com/${record.CoinInfo.ImageUrl}`}
        />
      );
    },
    className: "c-form_table-img",
  },
];
export default function InputExchange() {
  const [form] = Form.useForm();
  const [selectedOption, setSelectedOption] = useState<IOption[]>([]);
  const [listCoins, setListCoins] = useState<ITypeListCoins>([]);

  useEffect(() => {
    setListCoins(data.Data);
    const listCoins = data.Data.map((item) => {
      const trimmedText = item.ConversionInfo.RAW[0]
        .replace(item.ConversionInfo.SubsNeeded[0], "")
        .replace(/^~/, "")
        .replace(/~$/, "");
      const secondValue = trimmedText.split("~")[1];
      const parsedValue =
        Number(secondValue) > 1
          ? parseFloat(Number(secondValue).toFixed(2))
          : parseFloat(Number(secondValue).toFixed(7));
      return {
        value: parsedValue,
        label: item.CoinInfo.Name,
        icon: `https://cryptocompare.com/${item.CoinInfo.ImageUrl}`,
      };
    });
    setSelectedOption(listCoins);
    form.setFieldsValue({
      ["input"]: listCoins[0].value,
    });
    form.setFieldsValue({
      ["inputChange"]: listCoins[1].value,
    });
  }, []);
  const handelSubmitForm = () => {
    const dataCheck = form.getFieldsValue();
    form.setFieldsValue({
      ["inputScreen"]:
        (Number(dataCheck.inputFill) * Number(dataCheck.input)) /
        Number(dataCheck.inputChange),
    });
  };
  const handleButtonClick = () => {
    const dataChange = form.getFieldsValue();
    form.setFieldsValue({
      input: dataChange.inputChange,
      inputChange: dataChange.input,
      inputFill: dataChange.inputScreen,
      inputScreen: dataChange.inputFill,
    });
  };
  return (
    <div className="c-form">
      <div className="c-form_title">
        <h1>Binance Convert</h1>
      </div>
      <div className="c-form_currency">
        <Form
          onValuesChange={handelSubmitForm}
          form={form}
          initialValues={{
            input: selectedOption && selectedOption[0]?.value,
            inputChange: selectedOption && selectedOption[0]?.value,
            inputFill: 0.0,
            inputScreen: 0.0,
          }}
        >
          <Space.Compact>
            <Form.Item name={"input"}>
              <Select>
                {selectedOption?.map((option) => (
                  <Option key={option.value} value={option.value}>
                    <Space>
                      <img
                        src={option.icon}
                        alt={option.icon}
                        style={{ width: "20px", marginRight: "8px" }}
                      />
                      {option.label}
                    </Space>
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name={"inputFill"}>
              <Input type="number" min={0} step="any" />
            </Form.Item>
          </Space.Compact>
          <button type="button" onClick={() => handleButtonClick()}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/10044/10044681.png"
              width={30}
              height={30}
            />
          </button>
          <Space.Compact>
            <Form.Item name={"inputChange"}>
              <Select>
                {selectedOption?.map((option) => (
                  <Option key={option.value} value={option.value}>
                    <Space>
                      <img
                        src={option.icon}
                        alt={option.icon}
                        style={{ width: "20px", marginRight: "8px" }}
                      />
                      {option.label}
                    </Space>
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name={"inputScreen"}>
              <Input readOnly />
            </Form.Item>
          </Space.Compact>
        </Form>
      </div>
      <div className="c-form_table">
        <h2>Coin List</h2>
        <Table dataSource={listCoins} columns={columns} pagination={false} />;
      </div>
    </div>
  );
}
