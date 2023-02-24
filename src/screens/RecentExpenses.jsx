import { useContext, useEffect, useState } from "react";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import ErrorOverlay from "../components/UI/ErrorOverlay";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../Util/getFormatedDate";
import { FetchExpenses } from "../Util/Http";

const RecentExpenses=({navigation})=>{

    const [isFetching, setIsFetching] = useState(true);
    const [error,setError]=useState();

    const expensesCtx =useContext(ExpensesContext);

    //const [fetchedExpenses,setFetchedExpenses]=useState([]);

    useEffect(()=>{
        async function getExpenses(){
            setIsFetching(true);
            try{

                const expenses = await FetchExpenses();
                expensesCtx.setExpenses(expenses)
            }
            catch(e){
                setError('Could not fetch Expenses !')
            }
            setIsFetching(false);   
            //console.log("***************"+expenses)
        }

        getExpenses();
    },[])

    function errorHandler(){
            setError(null);
    }

    if(error && !isFetching){
        return <ErrorOverlay message={error} onConfirm={errorHandler} />
    }

    if(isFetching){
        return <LoadingOverlay />
    }

    const recentExpenses=expensesCtx.expenses.filter((expense)=>{
        const today = new Date();
        const date7DaysAgo = getDateMinusDays(today, 7);

        return expense.date > date7DaysAgo && expense.date <= today;
    })

    // navigation.setOptions({
    //     tabBarIcon: ({color,size})=> <Icon name="hourglass" color={color} size={size} />
    // })

    return(
        <ExpensesOutput expenses={recentExpenses} expensesPeriod="Last 7 Days" />
    )
}

export default RecentExpenses;