import { Button} from "@material-ui/core";

export const SourceFileInput = ({ setFile }) => {

  const showFile = async (e) => {
        e.preventDefault()
        const reader = new FileReader()
        reader.onload = async (e) => {
            const text = (e.target.result)
            console.log('=====>', text)
            setFile(text)
        };
        reader.readAsText(e.target.files[0])
    }

    return (
            <Button
                variant="contained"
                component="label"
                style={{ height: 250, width: '50%' }}
            >
                Upload File
                <input
                    type="file"
                    onChange={e => showFile(e)}
                    hidden
                />
            </Button>
    )
}