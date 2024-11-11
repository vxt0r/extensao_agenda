import { SQLiteProvider } from 'expo-sqlite';
import { Routes } from './src/routes';
import { initDB } from '@database/initDB';

export default function App() {
  
  return (
    <SQLiteProvider databaseName='agenda.db' onInit={initDB}>
        <Routes /> 
    </SQLiteProvider>
  );
}
