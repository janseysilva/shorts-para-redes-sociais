p = 'src/Root.tsx'; s = open(p, encoding='utf-8').read()
s = s.replace('import { CarroEnchente, FioCaido } from "./Perigo";', 'import { CarroEnchente, FioCaido } from "./Perigo";\nimport { CarroEnchenteReal } from "./PerigoReal";', 1)
s = s.replace('    <Composition id="CarroEnchente" ', '    <Composition id="CarroEnchenteReal" component={CarroEnchenteReal} defaultProps={{ tempos: tCarroEnchente as Tempos }} durationInFrames={Math.ceil(tCarroEnchente.total * FPS)} fps={FPS} width={1080} height={1920} />\n    <Composition id="CarroEnchente" ', 1)
open(p, 'w', encoding='utf-8').write(s)
