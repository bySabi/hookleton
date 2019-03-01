import { useState, useEffect } from 'react';
import createHook from '../component';

const useMousePosition = createHook(() => {
  const [position, setPosition] = useState({ x: null, y: null });

  const handleMouseMove = e => setPosition({ x: e.pageX, y: e.pageY });

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return [position];
});

const Mouse = () => {
  const [mousePosition] = useMousePosition();
  return (
    <div style={{ borderStyle: 'solid' }}>
      x: {mousePosition.x}, y: {mousePosition.y}
    </div>
  );
};

// put <Mouse /> in a table of 1x12 cells
const TableMouse = () => (
  <table>
    <tbody>
      <tr>
        {Array.from({ length: 12 }).map((_, idx) => (
          <td key={idx}>
            <Mouse />
          </td>
        ))}
      </tr>
    </tbody>
  </table>
);

// repeat <TableMouse /> 50 times
export default () => (
  <ul style={{ listStyle: 'none' }}>
    {Array.from({ length: 50 }).map((_, idx) => (
      <li key={idx}>
        <TableMouse />
      </li>
    ))}
  </ul>
);
