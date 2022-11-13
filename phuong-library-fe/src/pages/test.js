import React from 'react'

const Prize = () => {
  const prizes = [
    {title: "Giải thưởng tuần", slug: "week"}, 
    {title: "Giải thưởng tháng", slug: "month"}, 
    {title: "Giải thưởng mùa", slug: "season"}
  ]

  const rows = [
    {
      id: 1, 
      rating: 'Top 1',
      player: 'Player 1 ABCD XYZ',
      score: 500
    },
    {
      id: 2,
      rating: 'Top 2',
      player: 'Player 2 ABCD XYZ',
      score: 600
    },
  ]

  return (
    <div className='w-[870px] flex flex-col m-auto bg-slate-400'>
      <table className='table-fixed'>
        <thead className="bg-linearlr22506c sx:text-lg md:text-xl 2xl:text-[21px] uppercase text-white italic">
          <tr>
            {prizes.map(prize => (
              <th key={prize.slug} scope="col" className="px-3 py-4 w-1/3 border-r border-colorcs-5B5B5B bg-colorcs-051017">{prize.title}</th>
            ))}
          </tr>
        </thead>
      </table>
      <div className='w-full flex flex-col'>
        <div className='w-full h-[245px] bg-colorcs-051017 mt-5'>
          <p>BANER</p>
        </div>
        <div>
          <div>CHỌN TUẦN</div>
          <table className="table-fixed w-full text-center bg-colorcs-213663 UTM-Swiss">
            <tbody className="sx:bg-black sx:bg-opacity-50 sm:bg-colorcs-EEEEEE sx:text-base md:text-lg 2xl:text-xl sx:text-white sm:text-[#3E3E3E]">
                {rows.map(row => (
                  <tr key={row.id} className="table-row border-b border-colorcs-5B5B5B">
                    <td className="px-3 py-4">{row.rating}</td>
                    <td className="px-3 py-4">{row.player}</td>
                    <td className="px-3 py-4 last:border-r-0">{row.score}</td>
                  </tr>
                ))
                }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Prize