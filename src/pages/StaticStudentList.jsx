import React from 'react';

const StaticStudentList = () => {
  return (
    <div className="container">
      <h1>Student Directory</h1>
      <p style={{ marginBottom: '2rem', color: 'var(--text-secondary)' }}>
        Overview of enrolled Computer Education students.
      </p>

      <div className="card">
        <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              <th style={{ padding: '10px 0' }}>Student ID</th>
              <th style={{ padding: '10px 0' }}>Full Name</th>
              <th style={{ padding: '10px 0' }}>Department</th>
              <th style={{ padding: '10px 0' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {/* Hardcoded Row 1 */}
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              <td style={{ padding: '10px 0' }}>202601</td>
              <td style={{ padding: '10px 0', fontWeight: 'bold' }}>Akar Shwan</td>
              <td style={{ padding: '10px 0' }}>Computer Education</td>
              <td style={{ padding: '10px 0' }}><span className="badge present">Enrolled</span></td>
            </tr>
            
            {/* Hardcoded Row 2 */}
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              <td style={{ padding: '10px 0' }}>202602</td>
              <td style={{ padding: '10px 0', fontWeight: 'bold' }}>Zina Mohammed</td>
              <td style={{ padding: '10px 0' }}>Computer Education</td>
              <td style={{ padding: '10px 0' }}><span className="badge present">Enrolled</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StaticStudentList;