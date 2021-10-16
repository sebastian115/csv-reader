import {useState} from 'react'

export default function CsvReader(){
    const [csvFile, setCsvFile] = useState();
    const [csvArray, setCsvArray] = useState();

    const processCVS =(str, delim='') =>{

        //funcion para sacar la primera fila 
        const headers = str.slice(0, str.indexOf('\n')).split(delim);
        //funcion para sacar las filas 
        const rows = str.slice(str.indexOf('\n')+1).split('\n');
        //console.log(rows);

        const newArray = rows.map(row => {
            const values = row.split(delim);
            const eachObject = headers.reduce((obj, header, i) => {
                obj [header] = values[i];
                return obj;
            }, {})
            return eachObject;
        })

        setCsvArray(newArray)

    }
    const submit = () =>{
        const file = csvFile;
        const reader = new FileReader();

        reader.onload = function(e){
            const text = e.target.result;
            console.log(text);
            processCVS(text)
        }

        reader.readAsText(file);
    }
    return(
        <form id='csv-form'>
            <input
                type='file'
                accept='.csv'
                id='csvFile'
                onChange={(e) => {
                    setCsvFile(e.target.files[0])
                }}
            >

                </input>
                <br/>
                <button
                    onClick={(e) => {
                        e.preventDefault()
                        if(csvFile)submit()
                    }}
                >
                    Submit
                </button>
                <br/>
                <br/>
                {csvArray.length>0 ? null : null}
        </form>
    );
}