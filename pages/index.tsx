import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { useEffect, useState } from 'react';

export default function Home() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [todo, setTodo] = useState('');
    let changeHandler = (event) => {
        setTodo(event.target.value);
    };

    let addTodo = (event) => {
        setLoading(true);
        event.preventDefault();
        fetch('/api/add?todo=' + todo)
            .then((res) => res.json())
            .then((data) => {
                loadTodos();
            });
    };

    let removeTodo = (rtodo) => {
        setLoading(true);
        fetch('/api/remove?todo=' + rtodo)
            .then((res) => res.json())
            .then((data) => {
                loadTodos();
            });
    };

    let loadTodos = () => {
        console.log('load todos');
        fetch('/api/list')
            .then((res) => res.json())
            .then((data) => {
                setData(JSON.parse(data));
                setLoading(false);
            });
    };

    useEffect(() => {
        setLoading(true);
        loadTodos();
    }, []);

    if (!data) return 'Loading...';
    return (
        <div className={styles.container}>
            <Head>
                <title>musmemo</title>
                <meta name="description" content="memo for your muscle" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <div className={styles.grid}>
                    <h1 className={styles.title}>
                        💪 musmemo
                    </h1>
                    {loading ? (
                        <a href="#" className={styles.card}>
                            <Image src="/loader.gif" width="16" height="16" alt="loading"/>
                        </a>
                    ) : (
                        <form className={styles.cardForm} onSubmit={addTodo}>
                            <input
                                className={styles.cardInput}
                                type="text"
                                name="todo"
                                onChange={changeHandler}
                                placeholder="Enter your exciting TODO item!"
                            />
                        </form>
                    )}
                    {Object.values(data).map((item) => (
                        <a key={item} href="#" onClick={() => removeTodo(item)} className={styles.card}>
                            <p>{item}</p>
                        </a>
                    ))}
                </div>
            </main>
        </div>
    );
}
