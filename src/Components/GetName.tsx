import React, { FC } from 'react';
import GetProperty from './GetProperty';

interface IProps {
    table: string;
    id?: number;
  }
 
const GetName:FC<IProps> = ({table,id}:IProps) => {
if (id) {
    const name = GetProperty(table, id, "name");
    return <>{name}</>;}
}
export default GetName