import { Upload, message, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';



const { Dragger } = Upload;


export const FileInput = ({ setFileText }) => {

    const props = {
        name: 'file',
        multiple: false,
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {
                const reader = new FileReader()
                reader.onload = async (e) => {
                    const text = (e.target.result)
                    setFileText(text)
                };
                reader.readAsText(info.file.originFileObj)
            }
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        // listType:"picture",
        maxCount:1,
    };


    return (
        <Upload
            {...props}
        >
            <Button icon={<UploadOutlined />}>Upload (Max: 1)</Button>
        </Upload>
    )
}