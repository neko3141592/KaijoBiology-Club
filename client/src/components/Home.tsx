import { NavLink } from 'react-router-dom';
import { Timeline } from 'react-twitter-widgets';
import HomeNews from './HomeNews';


const Home:React.FC = () => {
    return (
        <div className='home'>
            <div className='title'>
                <div className='title-text'>
                    <h1>海城中高生物部</h1>
                </div>
            </div>
            <div className='contents'>
            
                <div className='guide'>
                    <h1>このページについて</h1>
                    <ul>
                        <li>
                            <NavLink to={'/about'}>生物部について知る</NavLink>
                            <p>紹介ページへ移動します</p>
                        </li>
                        <li>
                            <NavLink to={'/blogs'}>記事を見る</NavLink>
                            <p>記事一覧へ移動します</p>
                        </li>
                    </ul>
                    <h1>お知らせ</h1>
                    <HomeNews/>
                </div>
                <hr />
                <div className='twitter'>
                    <h1>X(Twitter)</h1>
                    <Timeline
                        dataSource={{
                            sourceType: 'profile',
                            screenName: 'K__Biology'
                        }}
                    />
                </div>
                
            </div>
        </div>
    );
}

export default Home;