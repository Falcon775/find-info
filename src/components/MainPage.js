
import {useEffect, useState} from "react";
import * as qna from "@tensorflow-models/qna";
import {Button, Card, Col, Layout, message, Row, Typography, List} from "antd";
import NavBar from "./Header";
import '@tensorflow/tfjs-backend-webgl';
import {FileInput} from "./FileInput";
import {AudioOutlined, UploadOutlined} from "@ant-design/icons";
import {QuestionInputs} from "./QustionInputs";

import firebase from 'firebase';

const {Header, Footer, Sider, Content} = Layout;
const {Paragraph, Text} = Typography;

function MainPage() {
    const [user, setUser] = useState(null)
    const [list, setList] = useState([])
    const [fileText, setFileText] = useState('')
    const [fileTextToUpload, setFileTextToUpload] = useState('')
    const [answers, setAnswers] = useState(null)
    var userId = localStorage.getItem('token');



    useEffect(() => {

        if (userId) {
            firebase.database().ref('/users/' + userId).once('value').then((snapshot) => {
                console.log('===> snapshot.val()', snapshot.val())

                setUser(snapshot.val())
            });
        }

    }, [])

    const getList = () => {
        const list = user?.files && Object.keys(user.files).map(id => ({
            id,
            value: user.files[id].file
        }))

        if (!list) {
            return []
        }
        return list

    }

    const findAnswer = async (question) => {
        console.log('====> start', setFileText)
        const model = await qna.load();
        const answers = await model.findAnswers(question, fileText);
        console.log('====>', answers);
        setAnswers(answers)
    }

    const uploadFile = async () => {

        if (!fileTextToUpload) return null

        const fileId = '_' + Math.random().toString(36).substr(2, 9);

        await firebase.database().ref('users/' + userId + '/files/' + fileId).set({
            file: fileTextToUpload
        });

        firebase.database().ref('/users/' + userId).once('value').then((snapshot) => {
            console.log('===> snapshot.val()', snapshot.val())

            setUser(snapshot.val())

            // ...
        });

    }


    return (
        <>
            <Layout className="layout">
                <Content style={{
                    minHeight: 280,
                    padding: 24,
                    background: '#fff'
                }}>
                    <Row>
                        <Col span={8}>
                            <Card style={{height: 400, overflowY: 'scroll'}}>
                                <Paragraph>{fileTextToUpload}</Paragraph>
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card style={{height: 400, overflowY: 'scroll'}}>
                                <Paragraph>{fileText}</Paragraph>
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card style={{height: 400}}>
                                <List
                                    header={<div>List</div>}
                                    bordered
                                    dataSource={getList()}
                                    renderItem={item => (
                                        <List.Item  actions={[<div onClick={() => setFileText(item.value)} >choose</div>]}  style={{height: 100, overflowY: 'scroll'}}>
                                            <Typography.Text mark>[ITEM]</Typography.Text>{item.value}
                                        </List.Item>
                                    )}
                                />
                            </Card>
                        </Col>
                    </Row>

                    <Row justify="center" style={{padding: 50, paddingBottom: 100}}>
                        <Col  span={8}><FileInput setFileText={setFileTextToUpload}/></Col>
                        <Col  span={8}><FileInput setFileText={setFileText}/></Col>
                    </Row>

                    <Row justify="center" style={{padding: 10}}>
                        <Col span={8}>
                            <Button type="primary" onClick={uploadFile} shape="round" title={'Upload to server'} size={8}>Upload to server</Button>
                        </Col>
                        <Col span={8}>
                            <Button type="primary" shape="round" icon={<AudioOutlined/>} size={8}/>
                        </Col>
                    </Row>
                    <Row justify="center">
                        <Col span={8}><QuestionInputs findAnswer={findAnswer}/></Col>
                    </Row>

                    {answers && answers.length === 0 &&
                    <Row justify="center" style={{padding: 10}}>
                        <Col><Paragraph>Couldn't find answer</Paragraph></Col>
                    </Row>
                    }

                    {answers && answers.length &&
                    <Row justify="center" style={{padding: 10}}>
                        <Col><Paragraph>{answers[0]?.text}</Paragraph></Col>
                    </Row>
                    }

                </Content>
                <Footer>
                    Footer
                </Footer>
            </Layout>

        </>

    );
}

export default MainPage;