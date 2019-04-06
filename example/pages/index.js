import Link from 'next/link';

const PREFIX = '/hookleton';

export default () => (
  <div style={{ textAlign: 'center' }}>
    <h1>Hookleton usage examples</h1>
    <ul style={{ listStyle: 'none' }}>
      <li>
        <Link href={`${PREFIX}/todo`}>
          <a>Todo</a>
        </Link>
      </li>
      <li>
        <Link href={`${PREFIX}/mouse`}>
          <a>Mouse</a>
        </Link>
      </li>
      <li>
        <Link href={`${PREFIX}/counter`}>
          <a>Counter</a>
        </Link>
      </li>
      <li>
        <Link href={`${PREFIX}/fetch`}>
          <a>Fetch</a>
        </Link>
      </li>
      <li>
        <p>----- Hookleton vs React Context -----</p>
      </li>
      <li>
        <Link href={`${PREFIX}/counterContext`}>
          <a>context-based Counter</a>
        </Link>
      </li>
      <li>
        <Link href={`${PREFIX}/counterHookleton`}>
          <a>hookleton Counter</a>
        </Link>
      </li>
      <li>
        <Link href={`${PREFIX}/mouseContext`}>
          <a>context-based Mouse</a>
        </Link>
      </li>
      <li>
        <Link href={`${PREFIX}/mouseHookleton`}>
          <a>hookleton Mouse</a>
        </Link>
      </li>
    </ul>
  </div>
);
