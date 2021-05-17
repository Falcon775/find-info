import './App.css';
import {Header} from "./components/AppBar";
import {SourceFileInput} from "./components/SourceFileInput";
import {Grid} from "@material-ui/core";
import {QuestionInputs} from "./components/QustionInputs";
import * as qna from "@tensorflow-models/qna"
import '@tensorflow/tfjs-backend-webgl';
import {useState} from "react";
function App() {
    const [file, setFile] = useState()

    const findAnswer = async () => {
        console.log('====> start', file)
        const passage = "Google LLC is an American multinational technology company that specializes in Internet-related services and products, which include online advertising technologies, search engine, cloud computing, software, and hardware. It is considered one of the Big Four technology companies, alongside Amazon, Apple, and Facebook. Google was founded in September 1998 by Larry Page and Sergey Brin while they were Ph.D. students at Stanford University in California. Together they own about 14 percent of its shares and control 56 percent of the stockholder voting power through supervoting stock. They incorporated Google as a California privately held company on September 4, 1998, in California. Google was then reincorporated in Delaware on October 22, 2002. An initial public offering (IPO) took place on August 19, 2004, and Google moved to its headquarters in Mountain View, California, nicknamed the Googleplex. In August 2015, Google announced plans to reorganize its various interests as a conglomerate called Alphabet Inc. Google is Alphabet's leading subsidiary and will continue to be the umbrella company for Alphabet's Internet interests. Sundar Pichai was appointed CEO of Google, replacing Larry Page who became the CEO of Alphabet."
        const question = "Where Nicola was born?"
        const model = await qna.load();
        const answers = await model.findAnswers(question, file);
        console.log('====>', answers);
    }

    return (
        <Grid container className="App" alignItems={'center'} justify={'center'} spacing={3}>
            <Grid onClick={findAnswer} xs={12}>
                <Header/>
            </Grid>
            <Grid container direction={'column'} alignItems={'center'} style={{marginTop: 150}}>
                <SourceFileInput setFile={setFile} />
                <QuestionInputs/>
            </Grid>

        </Grid>
    );
}

export default App;
