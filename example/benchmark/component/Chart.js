import { VictoryBar, VictoryChart, VictoryGroup, VictoryTheme, VictoryAxis } from 'victory';
import { NUM } from '../BENCH';

export default ({ data }) => {
  return (
    <div>
      <VictoryChart theme={VictoryTheme.material} width={600} height={260}>
        <VictoryGroup
          vertical
          offset={10}
          style={{ data: { width: 6 } }}
          colorScale={['brown', 'tomato', 'gold']}
        >
          <VictoryBar
            data={data
              .filter(i => i.name === 'hookleton')
              .map(i => ({ x: i.n.toString(), y: i.median }))}
          />
          <VictoryBar
            data={data
              .filter(i => i.name === 'context')
              .map(i => ({ x: i.n.toString(), y: i.median }))}
          />
          <VictoryBar
            data={data
              .filter(i => i.name === 'constate')
              .map(i => ({ x: i.n.toString(), y: i.median }))}
          />
        </VictoryGroup>
      </VictoryChart>
    </div>
  );
};
