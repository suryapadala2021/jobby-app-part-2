import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const Filters = () => {
  const arr = []
  const typeChanged = event => {
    if (event.target.checked) {
      arr.push(event.target.value)
    } else {
      const ind = arr.indexOf(event.target.value)
      arr.splice(ind, 1)
    }
    console.log(arr.join(','))
  }

  const salaryChanged = event => {
    console.log(event.target.value)
  }

  return (
    <>
      <h1 className="filter-heading">Type of Employment</h1>
      <ul className="filters-list">
        {employmentTypesList.map(each => (
          <li key={each.employmentTypeId} className="filter">
            <input
              onChange={typeChanged}
              id={each.employmentTypeId}
              type="checkbox"
              value={each.employmentTypeId}
            />
            <label className="label" htmlFor={each.employmentTypeId}>
              {each.label}
            </label>
          </li>
        ))}
      </ul>
      <hr className="divider" />
      <h1 className="filter-heading">Salary Range</h1>
      <ul className="filters-list">
        {salaryRangesList.map(each => (
          <li key={each.salaryRangeId} className="filter">
            <input
              name="salary"
              onChange={salaryChanged}
              id={each.salaryRangeId}
              type="radio"
              value={each.salaryRangeId}
            />
            <label className="label" htmlFor={each.salaryRangeId}>
              {each.label}
            </label>
          </li>
        ))}
      </ul>
    </>
  )
}
export default Filters
