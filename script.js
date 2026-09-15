const EXAMPLES = [
  {
    id: "MkJuGDph-1k_000070",
    caption: "a dog is barking ⇒ a lion is roaring.",
  },
  {
    id: "kJe373Z1qsc_000050",
    caption: "a race car is driving down the street ⇒ a police car is driving down the street.",
  },
  {
    id: "ehnGYrg3Vaw_000252",
    caption: "a fire is exploding in the field ⇒ water is splashing in the field.",
  },
  {
    id: "997RTKzc39c_000146",
    caption: "a bird is chirping ⇒ a seagull is chirping.",
  },
  {
    id: "2Zir1UxVpxo_000005",
    caption: "a fox is barking ⇒ a tiger is roaring.",
  },
  {
    id: "KEeyw8lcPKs_000000",
    caption: "a man is playing basketball ⇒ a man is playing an exploding bomb.",
    failure: true,
  },
];

function videoCell(src, label, isOurs) {
  const cell = document.createElement("div");
  cell.className = "vcell" + (isOurs ? " vcell--ours" : "");
  const labelEl = document.createElement("div");
  labelEl.className = "vlabel";
  labelEl.textContent = label;
  const video = document.createElement("video");
  video.controls = true;
  video.preload = "metadata";
  video.playsInline = true;
  const source = document.createElement("source");
  source.src = `videos/${src}`;
  source.type = "video/mp4";
  video.appendChild(source);
  cell.appendChild(labelEl);
  cell.appendChild(video);
  return cell;
}

function buildPanel(example, index) {
  const panel = document.createElement("div");
  panel.className = "panel";
  panel.id = `panel-${index}`;
  panel.role = "tabpanel";
  panel.hidden = index !== 0;

  const caption = document.createElement("p");
  caption.className = "example-caption";
  caption.innerHTML = (example.failure ? "<span class=\"tag-failure\">Failure case</span> " : "") + example.caption;
  panel.appendChild(caption);

  const sourceRow = document.createElement("div");
  sourceRow.className = "vgrid vgrid--single";
  sourceRow.appendChild(videoCell(`source_${example.id}.mp4`, "Source video", false));
  panel.appendChild(sourceRow);

  const groups = [
    {
      title: "Video edited with RAVE",
      cells: [
        ["Ours", `rave_ours_${example.id}.mp4`, true],
        ["ZETA", `rave_zeta_${example.id}.mp4`, false],
        ["SDEdit", `rave_sdedit_${example.id}.mp4`, false],
        ["V2A", `rave_v2a_${example.id}.mp4`, false],
      ],
    },
    {
      title: "Video edited with VACE",
      cells: [
        ["Ours", `vace_ours_${example.id}.mp4`, true],
        ["ZETA", `vace_zeta_${example.id}.mp4`, false],
        ["SDEdit", `vace_sdedit_${example.id}.mp4`, false],
        ["V2A", `vace_v2a_${example.id}.mp4`, false],
      ],
    },
  ];

  for (const group of groups) {
    const heading = document.createElement("p");
    heading.className = "group-title";
    heading.textContent = group.title;
    panel.appendChild(heading);

    const grid = document.createElement("div");
    grid.className = "vgrid vgrid--four";
    for (const [label, file, isOurs] of group.cells) {
      grid.appendChild(videoCell(file, label, isOurs));
    }
    panel.appendChild(grid);
  }

  const avedHeading = document.createElement("p");
  avedHeading.className = "group-title";
  avedHeading.textContent = "Joint video + audio editing baseline";
  panel.appendChild(avedHeading);

  const avedRow = document.createElement("div");
  avedRow.className = "vgrid vgrid--single";
  avedRow.appendChild(videoCell(`AvED_${example.id}.mp4`, "AvED", false));
  panel.appendChild(avedRow);

  return panel;
}

function init() {
  const tabsEl = document.querySelector(".tabs");
  const panelsEl = document.querySelector(".panels");

  EXAMPLES.forEach((example, index) => {
    const tab = document.createElement("button");
    tab.className = "tab" + (index === 0 ? " tab--active" : "");
    tab.type = "button";
    tab.role = "tab";
    tab.setAttribute("aria-controls", `panel-${index}`);
    tab.setAttribute("aria-selected", index === 0 ? "true" : "false");
    tab.textContent = `Example ${index + 1}`;
    tab.addEventListener("click", () => selectExample(index));
    tabsEl.appendChild(tab);

    panelsEl.appendChild(buildPanel(example, index));
  });
}

function selectExample(index) {
  document.querySelectorAll(".tab").forEach((tab, i) => {
    tab.classList.toggle("tab--active", i === index);
    tab.setAttribute("aria-selected", i === index ? "true" : "false");
  });
  document.querySelectorAll(".panel").forEach((panel, i) => {
    panel.hidden = i !== index;
  });
}

document.addEventListener("DOMContentLoaded", init);
