---
title: "Navigation and Control Framework for Radar-Avoidant Quadrotor Flight in Pre-Mapped Environments"
date: 2026-03-29
categories:
  - Research
tags:
  - UAV
  - Quadrotor
  - Path Planning
  - Control
  - RRT*
  - MPC
  - Sliding Mode Control
  - CBF
excerpt: "A hierarchical planning–control framework for radar-avoidant quadrotor flight, combining RRT* path planning, IT-ASMC outer-loop control, LPV-MPC inner-loop attitude regulation, and CBF-based safety filtering."
---

> **Authors:** Tien Dat Vu, Phuong-Tung Pham
> **Affiliation:** Ho Chi Minh City University of Technology (HCMUT), Vietnam National University Ho Chi Minh City
> **Presented:** March 29, 2026

[**Download Slides (PDF)**](/assets/pdf/SlideOsaka.pdf){: .btn .btn--primary}

---

## Motivation

UAV missions in pre-mapped and radar-surveilled environments demand:

- Safe navigation through cluttered areas
- Avoidance of radar exposure regions
- Accurate trajectory tracking under disturbances
- Real-time feasibility with actuator constraints

Classical path planning alone does not guarantee trackable and robust motion. Pure control design alone does not explicitly handle global radar-avoidant routing. Hence, a **unified planning–control framework** is needed.

---

## Main Contributions

A hierarchical framework is proposed with four key components:

1. **RRT\*** — generates a collision-free and radar-aware global route
2. **Trajectory smoothing** — converts the waypoint sequence into a time-parameterized smooth reference
3. **IT-ASMC (outer loop)** — provides robust translational tracking
4. **LPV-MPC (inner loop)** — regulates attitude under control constraints
5. **CBF-based safety filter** — preserves safe forward invariance near danger regions

---

## Dynamic Model

### Control Inputs

The four rotor angular speeds $$\Omega_i,\ i = 1,2,3,4$$ produce aggregated control inputs:

$$
\begin{cases}
U_1 = C_T \left(\Omega_1^2 + \Omega_2^2 + \Omega_3^2 + \Omega_4^2\right) \\
U_2 = C_T \left(\Omega_2^2 - \Omega_4^2\right) \\
U_3 = C_T \left(\Omega_3^2 - \Omega_1^2\right) \\
U_4 = C_Q \left(\Omega_1^2 + \Omega_2^2 - \Omega_3^2 - \Omega_4^2\right)
\end{cases}
$$

where $$U_1$$ is total thrust, $$U_2$$ roll moment, $$U_3$$ pitch moment, and $$U_4$$ yaw moment.

### Rotational Dynamics

$$
\dot{p} = \frac{(I_y - I_z)qr - J_r q\Omega + U_2}{I_x}, \quad
\dot{q} = \frac{(I_z - I_x)pr - J_r p\Omega + U_3}{I_y}, \quad
\dot{r} = \frac{(I_x - I_y)pq + U_4}{I_z}
$$

The attitude motion is nonlinear and coupled, motivating the use of an LPV-MPC inner-loop controller.

### Translational Dynamics

$$
\ddot{X} = \left(\cos\phi\sin\theta\cos\psi + \sin\phi\sin\psi\right)\frac{U_1}{m}
$$

$$
\ddot{Y} = \left(\cos\phi\sin\theta\sin\psi - \sin\phi\cos\psi\right)\frac{U_1}{m}
$$

$$
\ddot{Z} = -g + \cos\phi\cos\theta\frac{U_1}{m}
$$

The translational subsystem is strongly coupled with attitude angles, motivating a **cascade (outer–inner loop) architecture**.

---

## Navigation and Control Architecture

The overall system follows a hierarchical structure:

1. **Planner (RRT\*)** → generates a radar-avoidant reference path
2. **Trajectory smoother** → converts waypoints to a smooth time-parameterized reference
3. **Outer loop (IT-ASMC)** → computes virtual translational commands from position error
4. **CBF safety filter** → modifies the nominal command only when safety is threatened
5. **Inner loop (LPV-MPC)** → tracks attitude references while satisfying actuator constraints

### Why LPV-MPC for the Inner Loop?

The attitude subsystem is nonlinear and parameter-varying. LPV-MPC provides:
- Prediction-based attitude regulation
- Explicit handling of input constraints
- Improved feasibility in real-time implementation

The inner-loop optimization problem:

$$
J = \frac{1}{2}e_Q^\top Q e_Q + \frac{1}{2}\sum_{k=0}^{N_p - 1}\left(e_k^\top Q e_k + \Delta u_k^\top R \Delta u_k\right)
$$

subject to $$x_{k+1} = A(\sigma_k)x_k + B(\sigma_k)u_k$$ and $$\Delta u_{\min} \leq \Delta u_k \leq \Delta u_{\max}$$.

### Why IT-ASMC for the Outer Loop?

The translational subsystem is affected by matched disturbances. IT-ASMC achieves:
- Robust position tracking
- Finite-time convergence behavior
- Improved transient performance over long missions

The terminal integral sliding surface:

$$
s_i = \dot{e}_i + \alpha_i e_i + \beta_i \int_0^t e_i(\tau)\,d\tau + \gamma_i |e_i|^\mu \text{sign}(e_i), \quad i \in \{x,y,z\}
$$

### CBF-Based Safety Filtering

Safety is guaranteed by a control barrier function over the safe set $$\mathcal{C} = \{x \in \mathbb{R}^n \mid h(x) \geq 0\}$$, enforcing:

$$
\dot{h}(x, u) + \alpha(h(x)) \geq 0
$$

The CBF layer only modifies the nominal control when the UAV approaches radar-threat regions, obstacles, or unsafe forward states — keeping the controller as close as possible to the nominal tracking policy.

---

## Path Planning: RRT\*

RRT\* is used to construct a feasible path from the initial to the target point, accounting for:
- Obstacle avoidance
- Radar-zone avoidance
- Path optimality refinement

The resulting waypoint sequence is smoothed into a trackable reference trajectory.

---

## Simulation Results

Simulations were conducted to verify the planning–control integration.

**Key findings:**
- RRT\* successfully produces a radar-avoidant and obstacle-free path
- The trajectory smoothing stage yields a trackable reference
- Both horizontal and vertical position states converge to their references with small steady-state error
- Attitude angles (roll, pitch, yaw) track their references rapidly and stably
- Control signals $$U_1, U_2, U_3, U_4$$ remain bounded throughout the mission — no aggressive or unrealistic actuation observed

---

## Conclusion

A unified hierarchical navigation and control framework has been presented for radar-avoidant quadrotor flight in pre-mapped environments:

| Component | Role |
|-----------|------|
| **RRT\*** | Global radar-aware path planning |
| **IT-ASMC** | Robust outer-loop translational tracking |
| **LPV-MPC** | Constrained inner-loop attitude stabilization |
| **CBF** | Online safety filtering |

The results demonstrate **accurate tracking**, **control feasibility**, and **reliable radar-zone avoidance**.
