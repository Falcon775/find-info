import { Input, Space } from 'antd';
import { AudioOutlined } from '@ant-design/icons';

const { Search } = Input;

const suffix = (
    <AudioOutlined
        style={{
            fontSize: 16,
            color: '#1890ff',
        }}
    />
);


export const QuestionInputs = ({ findAnswer}) => {

    return (
        <>
            <Search
                placeholder="Ask here"
                allowClear
                enterButton="Ask"
                size="large"
                onSearch={findAnswer}/>
        </>
    )
}
