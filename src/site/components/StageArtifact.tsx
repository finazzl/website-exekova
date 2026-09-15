import Icon from '@/components/Icon';

type Row = { kind: 'kv'; key: string; value: string } | { kind: 'check' | 'fail' | 'add' | 'remove' | 'text'; text: string };

/** Reads one artefact line into a row: "Period → current review window", "✓ passed", "PASS  case", "+ added", "Scope: value" or plain text. */
function parse(line: string): Row {
  if (/^✓\s*/.test(line)) return { kind: 'check', text: line.replace(/^✓\s*/, '') };
  if (/^PASS\s+/.test(line)) return { kind: 'check', text: line.replace(/^PASS\s+/, '') };
  if (/^FAIL\s+/.test(line)) return { kind: 'fail', text: line.replace(/^FAIL\s+/, '') };
  if (/^[−-]\s/.test(line)) return { kind: 'remove', text: line.replace(/^[−-]\s/, '') };
  if (/^\+\s?/.test(line)) return { kind: 'add', text: line.replace(/^\+\s?/, '') };
  const arrow = line.split(' → ');
  if (arrow.length === 2) return { kind: 'kv', key: arrow[0], value: arrow[1] };
  const colon = line.match(/^([A-Z][A-Za-z ]{1,24}):\s+(.+)$/);
  if (colon) return { kind: 'kv', key: colon[1], value: colon[2] };
  return { kind: 'text', text: line };
}

/** The artefact a run stage produces, shown as a small record: a file name and its rows. */
export default function StageArtifact({ file, lines }: { file: string; lines: string[] }) {
  if (!lines.length) return null;
  const [name, note] = file.split(' · ');
  return <div className="site-artifact">
    {name && <div className="site-artifact-head"><Icon name="file" size={13}/><span>{name}</span>{note && <small>{note}</small>}</div>}
    <ul>{lines.map(parse).map((row, index) => row.kind === 'kv'
      ? <li key={index} data-kind="kv"><span className="site-artifact-key">{row.key}</span><span>{row.value}</span></li>
      : <li key={index} data-kind={row.kind}>
          {row.kind === 'check' && <Icon name="check" size={13}/>}
          {row.kind === 'fail' && <Icon name="close" size={13}/>}
          {(row.kind === 'add' || row.kind === 'remove') && <span className="site-artifact-sign" aria-hidden="true">{row.kind === 'add' ? '+' : '−'}</span>}
          <span>{row.text}</span>
        </li>)}</ul>
  </div>;
}
