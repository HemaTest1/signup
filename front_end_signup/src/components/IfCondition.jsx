import React from 'react'

function MisGoal(){
    return "MisGoal";
}
function GoalAchived(){
    return "Goalachived";
}
const IfCondition = (props) => {
    console.log(props)
    const isGoal = props;
  
    if(isGoal){
        return <GoalAchived />
    }
    else{
        return <MisGoal />
    }
}

export default IfCondition