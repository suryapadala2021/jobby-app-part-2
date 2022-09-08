import './index.css'

const Filters = props => {
  const {
    employmentTypesList,
    salaryRangesList,
    changeSalary,
    changeType,
  } = props
  const typeChanged = event => {
    changeType(event.target.value, event.target.checked)
  }

  const salaryChanged = event => {
    changeSalary(event.target.value)
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
