import MovieCard from './MovieCard'

export default function TitleGrid({ items }) {
  return <div className="movie-grid">{items.map(item => <MovieCard key={item.id} item={item}/>)}</div>
}