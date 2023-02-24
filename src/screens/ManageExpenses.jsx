import { useContext, useLayoutEffect, useState } from "react";
import ExpenseForm from "../components/Expense Manage/ExpenseForm";

import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constant/Style";
import { ExpensesContext } from "../store/expenses-context";
import { View, StyleSheet, Text } from "react-native";
import { deleteExpense, storeExpense, updateExpense } from "../Util/Http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

// const { Text, View, StyleSheet } = require("react-native")

const ManageExpense = ({ route, navigation }) => {

    const [isSubmitting,setIsSubmiting]=useState(false);
    const [error,setError]=useState();

    const expensesCtx = useContext(ExpensesContext);

    const editedExpenseId = route.params?.expenseId;
    const isEdition = !!editedExpenseId;

    const selectedExpenses=expensesCtx.expenses.find(
        (expense)=> expense.id === editedExpenseId
        )

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEdition ? 'Edit Expense' : 'Add Expense'
        })
    }, [navigation, isEdition])

    async function deleteExpenseHandler(){
        setIsSubmiting(true);
        try{
            await deleteExpense(editedExpenseId)
            expensesCtx.deleteExpense(editedExpenseId);
            navigation.goBack();
        }
        catch(e){
            setError('Could not delete expense - please try again later! ')
        }
        setIsSubmiting(false);
    }
    const cancleHandler=()=>{
        navigation.goBack();
    }
    async function confirmHandler(expenseData){
        setIsSubmiting(true);
        try
        {
            if(isEdition){
                expensesCtx.updateExpense(editedExpenseId,expenseData);
                await updateExpense(editedExpenseId,expenseData);
            }
            else{
                const id=await storeExpense(expenseData);
                expensesCtx.addExpense({...expenseData, id: id});
            }
            navigation.goBack();
        }
        catch(e)
        {
            setError("Could not send data-please try again later!")
            setIsSubmiting(false)
        }


        
    }

    function errorHandler(){
        setError(null); 
    }

    if(error && !isSubmitting)
    {
        return <ErrorOverlay message={error} onConfirm={errorHandler}/>
    }

    if(isSubmitting){
        return <LoadingOverlay />
    }

    return (

        <View style={styles.conatiner}>
            <ExpenseForm 
            onCancle={cancleHandler}
            onSubmit={confirmHandler}
            submitButtonLabel={isEdition ? 'Update' : 'Add'}
            defaultValue={selectedExpenses}
            />

            {isEdition && <View style={styles.deleteContainer}><IconButton icon="trash" color={GlobalStyles.colors.error500} size={24} onPress={deleteExpenseHandler} /></View>}
        </View>
    )
}

export default ManageExpense;

const styles = StyleSheet.create({
    conatiner: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary800
    },
    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: 'center'
    },
  
})