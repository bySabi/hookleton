import Link from 'next/link';

export default () => (
  <div style={{ textAlign: 'center' }}>
    <h1>Hookleton usage examples</h1>
    <ul style={{ listStyle: 'none' }}>
      <li>
        <Link href="/todo">
          <a>Todo</a>
        </Link>
      </li>
      <li>
        <Link href="/mouse">
          <a>Mouse</a>
        </Link>
      </li>
      <li>
        <Link href="/counter">
          <a>Counter</a>
        </Link>
      </li>
      <li>
        <Link href="/counters5x5">
          <a>Counters 5x5</a>
        </Link>
      </li>
      <li>
        <Link href="/counters10x40">
          <a>Counters 10x40</a>
        </Link>
      </li>
      <li>
        <Link href="/counters10x40blocking">
          <a>Counters 10x40 blocking</a>
        </Link>
      </li>
      <li>
        <Link href="/fetch">
          <a>Fetch</a>
        </Link>
      </li>
      <li>
        <p>----- Hookleton vs React Context -----</p>
      </li>
      <li>
        <Link href="/counterContext">
          <a>context-based Counter</a>
        </Link>
      </li>
      <li>
        <Link href="/counterHookleton">
          <a>hookleton Counter</a>
        </Link>
      </li>
      <li>
        <Link href="/mouseContext">
          <a>context-based Mouse</a>
        </Link>
      </li>
      <li>
        <Link href="/mouseHookleton">
          <a>hookleton Mouse</a>
        </Link>
      </li>
    </ul>
  </div>
);
