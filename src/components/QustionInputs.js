import {Grid, IconButton, TextField} from "@material-ui/core";
import MicIcon from '@material-ui/icons/Mic';


export const QuestionInputs = () => {
    return (
        <>
            <Grid item xs={5}>
                <TextField id="standard-search" label="Search field" type="search" />
            </Grid>
            <Grid item xs={1} />
            <Grid item xs={1}>
                <label htmlFor="icon-button-file">
                    <IconButton color="primary" aria-label="upload picture" component="span">
                        <MicIcon />
                    </IconButton>
                </label>
            </Grid>
        </>
    )
}
