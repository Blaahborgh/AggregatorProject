import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import axios from 'axios'

class DataTable extends React.Component{
    constructor(){
        super();
        this.state = {
            columns: [
                            {id: 'id', label: 'Номер', minWidth: 170},
                            {id: 'name', label: 'Название', minWidth: 100},
                        ],
            rows : [],
            classes: makeStyles({
                            root: {
                                width: '100%',
                            },
                            container: {
                                maxHeight: 440,
                            },
                        }),
            page: 0,
            rowsPerPage: 10
        };
        this.handleChangePage = this.handleChangePage.bind(this);
        this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
    }

    componentDidMount (){
        axios.get('http://127.0.0.1:8000/api/authors').then(response => {
            this.setState({ rows: response.data });
        });
    }

    handleChangePage = (event, newPage) => {
        this.setState({
            page: newPage
        });
    };

    handleChangeRowsPerPage = event => {
        this.setState({
            rowsPerPage: event.target.value,
            page: 0
        })
    };

    render(){
/*
        const handleChangePage = (event, newPage) => {
            setPage(newPage);
        };

        const handleChangeRowsPerPage = event => {
            setRowsPerPage(+event.target.value);
            setPage(0);
        };
*/
        return (
            <Paper className={this.state.classes.root}>
                <TableContainer className={this.state.classes.container}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {this.state.columns.map(column => {
                                    return (
                                        <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{minWidth: column.minWidth}}>
                                        {column.label}
                                        </TableCell>
                                    );
                                    })
                                }
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.rows.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map(row => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                        {this.state.columns.map(column => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {value}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={this.state.rows.length}
                    rowsPerPage={this.state.rowsPerPage}
                    page={this.state.page}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
            </Paper>
        );
    }
}
/*
async function API()
{
    let response = await axios.get('http://127.0.0.1:8000/api/authors');
    console.log(response.data);
    return response.data;
        .then((response) => {
           console.log(response.data);
            response.data.forEach(row => {
                rows.push([row['id'], row['name']]);
            });
            rows = response.data;
        });
};*/

export default DataTable;