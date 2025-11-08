---
title: "UAV Paper ver EG Main fix full content"
excerpt: "The paper presents a navigation architecture for quadcopter
radar evasion in environments where ground-based radar stations/coverage
zones are known in advance from mission maps"
header:
  overlay_color: "#000"
  overlay_filter: "0.5"
  overlay_image: /assets/images/iot-header.jpg
  teaser: /assets/images/iot-teaser.jpg
categories: [UAV, Robotic]
tags: [UAV, Robotic, Control, Quadrotor, real-time, LPV, MPC]
date: 2024-08-15
---

*Radar-Avoidant Quadrotor Flight via RRT-Guided LPV--MPC with CBFs,
Feedback Linearization, and Integral-Terminal- Adaptive Sliding mode
control*

  ---------------------------------------------------------------------------
  1^st^ Dat Vu Tien\                     ^2nd^ Phuong Tung Pham\
  *Ho Chi Minh City University of        *Ho Chi Minh City University of
  Technology (HCMUT)\                    Technology (HCMUT)\
  Vietnam National University Ho Chi     Vietnam National University Ho Chi
  Minh City (VNU-HCM)\*                  Minh City (VNU-HCM)\*
  Ho Chi Minh City, Viet Nam\            Ho Chi Minh City, Viet Nam\
  *[dat.vuv@hcmut.edu.vn]{.underline}*   [ pptung@hcmut.edu.vn]{.underline}
  -------------------------------------- ------------------------------------
                                         

  ---------------------------------------------------------------------------

*Abstract: The paper presents a navigation architecture for quadcopter
radar evasion in environments where ground-based radar stations/coverage
zones are known in advance from mission maps. At the planning layer, we
employ Rapidly-Exploring Random Tree Star (RRT*★*) on a "radar exposure"
cost field (assuming known coverage radii), generating waypoints from
which a cubic spline trajectory is constructed. The time
parameterization and discretization of the spline are carefully handled
to avoid instability at junction nodes. At the control layer, the
trajectory is tracked by an LPV--MPC, in which a Control Barrier
Function (CBF) acts as a safety filter at the output, preventing control
commands from driving the UAV into radar detection zones.
Simultaneously, in a cascade architecture, the position channel is made
robust through a Feedback Linearization branch (decoupling and nominal
linearization of translational dynamics) combined with Adaptive
Sliding-Mode Control (compensating for model mismatch and external
disturbances), ensuring stable trajectory tracking under uncertainties.
The proposed method is validated in MATLAB simulations with multiple
radar layouts and terrain occlusions, demonstrating accurate tracking,
strict radar-evasion compliance, and clear advantages over traditional
controllers (PID, LQR, ...).*

Keywords---LPV-MPC; Control barrier function; Adaptive control;Adaptive
sliding mode control; safe control; quadrotor/UVA; Real-time
optimization, collision avoidance.

# **Introduction** 

Unmanned aerial vehicle (UAV) missions in radar-surveilled areas impose
two key requirements: (i) trajectories and control inputs must satisfy
dynamic and actuator constraints, and (ii) radar detection probability
must be minimized. This work assumes that radar positions are known a
priori from mission maps or intelligence sources, treating them as
external threats. The main challenge lies in embedding radar-evasion
constraints---represented by exposure or SNR fields---into both
trajectory planning and real-time control under the limited
computational resources of small UAVs.

Related works have addressed UAV navigation and control via classical
PID, LQR, or Sliding Mode Control (SMC) laws, which offer satisfactory
nominal performance but lack mechanisms to systematically enforce
input/state or safety constraints. Model Predictive Control (MPC)
provides a principled approach to constraint handling through
finite-horizon optimization. However, direct nonlinear MPC is
computationally demanding and prone to infeasibility on embedded UAV
hardware. Simplified global linearization reduces complexity but
compromises model fidelity and robustness. Recent hybrid
strategies---such as LPV-based MPC formulations and CBF-augmented
control---have improved real-time feasibility and safety certification,
yet few integrate these with robust adaptive outer loops for
mission-level radar avoidance.

To address this gap, We propose a unified two-layer planning--control
framework for real-time radar avoidance. At the planning layer, radar
zones are mapped into an exposure-based cost field where RRT★ generates
safe waypoints smoothed into time-parameterized splines. The outer
control layer combines Feedback Linearization with an Integral--Terminal
Adaptive Sliding Mode Controller (IT-ASMC) for robust, finite-time
tracking. A Control Barrier Function (CBF) acts as a safety filter,
ensuring forward invariance of radar-free zones. The inner loop employs
a Linear Parameter-Varying MPC (LPV--MPC) for high-frequency attitude
regulation with guaranteed feasibility and actuator constraint handling.

This architecture integrates safety, robustness, and real-time
feasibility. The main contributions of this work are: (i) a unified
radar-evasion framework combining planning and control, (ii) an
exposure-based RRT★ planner with spline time-parameterization, (iii) an
LPV--MPC inner loop ensuring constraint-satisfied attitude regulation,
and (iv) an adaptive IT-ASMC outer loop with CBF-based safety filtering
for finite-time, disturbance-rejected trajectory tracking.

![**Figure 1** **Dynamic reference
frame**](media/image1.png){alt="A diagram of a quadcopter AI-generated content may be incorrect."
width="2.5408530183727036in" height="1.8in"}

# **QUADCOPTER DYNAMIC MODEL**

Quadcopter dynamic equations are built in the body frame for Attitude
control strategy and built in the inertial frame for external position
control layer. The above dynamic equation is constructed using the
Newton-Euler method. In this context![](media/image2.wmf) represents the
position vector of the UAV in the inertia frame. ![](media/image3.wmf)
are the Euler angles describing the orientation of the body frame
relative to the inertia frame, also referred to as roll, pitch, and yaw.
![](media/image4.wmf) are the angular velocity components (rad/s) of the
body frame relative to the inertia frame, expressed in the body
frame,![](media/image5.wmf) are the linear velocity components of the
UAV in the body frame, and $g$is the gravitational acceleration. The
inertia tensor of the UAV with respect to its body axes is simplified to
a diagonal matrix ![](media/image6.wmf). Ω is the sum of the velocities
of the motors, i.e., ![](media/image7.wmf). ![](media/image8.wmf) is the
total angular momentum of the UAV's rotors. The control inputs of the
UAV ![](media/image9.wmf) defined as in Fig. 1 are:

\(1\)

From (9) it follows that vector![](media/image11.wmf) represents the
angular velocities of the corresponding motors. In this paper, the
dynamic equations used to model the UAV motion are derived accordingly.
The dynamic equations are discretized with respect to the sampling time
T. The solution method adopted in this work is based directly on the
Euler method.

\(2\)

\(3\)

\(4\)

\(5\)

\(6\)

\(7\)

![](media/image17.wmf)

\(8\)

\(10\)

\(9\)

# **CONTROLLER DESIGN** 

***3.1. Control structure***

In UAV control or flight control systems in general, the control tasks
can be divided into two main categories: (i) **attitude control** of the
UAV, and (ii) **position control** of the UAV. Assuming that the
reference trajectory is predefined, a position controller (velocity,
displacement) is employed to generate commands in the inertial frame.
The outcome of this process is then transmitted to the attitude
controller, which transforms them into attitude/thrust commands for the
UAV. The overall control process as well as the details of each control
block are presented as follows:

![](media/image19.wmf)

![](media/image20.wmf)

![](media/image21.wmf)

![](media/image22.wmf)

![](media/image22.wmf)

![](media/image22.wmf)

![](media/image23.wmf)

![](media/image24.wmf)

![](media/image25.wmf)

![](media/image26.wmf)

![](media/image25.wmf)

![**Figure 2** **Control architecture block
diagram**](media/image27.wmf)

The cascade architecture separates the fast LPV--MPC inner loop and the
IT--ASMC--FBL outer loop, ensuring robustness and constraint
satisfaction.

### **Attitude control** 

For attitude control, the UAV is controlled in the body frame. The main
state variables to be controlled are the Euler angles. Based on (4),
(5), and (6), the differential equations can be expressed as:

\(13\)

\(12\)

\(11\)

In UAV control, attitude is regulated through the following dynamic
equations:

\(16\)

\(15\)

\(14\)

From (14), (15), and (16), the affine state-space equations are obtained
as:

\(17\)

To ensure stable control, we redefine the control input as the deviation
from the nominal input. Specifically, instead of directly controlling
![](media/image32.wmf) we define![](media/image33.wmf)such that:
![](media/image34.wmf). Using a state augmentation technique, the
dynamics can be expressed as:

![](media/image35.wmf)

\(18\)

#### **Model predictive control for tracking problem.**

At each sampling instant, the controller optimizes a sequence of
**incremental control inputs** ![](media/image37.wmf)over the
discrete-time LPV model to track the reference trajectory generated by
the planner. The tracking error is defined as

![](media/image38.wmf)![](media/image39.wmf)

where![](media/image40.wmf)comes from the time-parameterized spline. The
cost function penalizes both the stage tracking error and the terminal
error.

\(19\)

s.t ![](media/image42.wmf)

We denote $J'$as the transformed and simplified version of the original
cost function $J$, yielding an equivalent QP formulation with the same
optimal solution but reduced computational complexity.

\(20\)

In which:

![](media/image44.wmf),

![](media/image45.wmf)

![](media/image46.wmf),![](media/image47.wmf)

We then have: ![](media/image48.wmf)

s.t ![](media/image49.wmf)

![](media/image50.wmf) only ![](media/image51.wmf) is applied to the
plant; the values ![](media/image52.wmf) are not used. The procedure is
repeated over the entire process (receding horizon).

Up to this point, after the above transformations, the objective
function has been cast into a QP form. The key strength of MPC is the
ability to impose constraints. In the next part we construct problem
constraints in a form compatible with the QP formulation.

#### **Constrain construction** 

We have:

![](media/image53.wmf)

![](media/image54.wmf)

From (1) then we have:

![](media/image55.wmf)

Since the LPV-MPC regulates only ![](media/image56.wmf) we design bounds
for these variables.

We have: ![](media/image57.wmf) with ![](media/image58.wmf)

In wich ![](media/image59.wmf),![](media/image60.wmf)

We have:

![](media/image61.wmf)

![](media/image62.wmf)

![](media/image63.wmf)

From (15) and: ![](media/image64.wmf)![](media/image39.wmf)

![](media/image65.wmf)

We have: ![](media/image66.wmf)

![](media/image67.wmf)

![](media/image68.wmf)

#### **Solution approach for the constrained quadratic program**

After reformulating the tracking constraints into the compact inequality

![](media/image69.wmf)

the MPC law at each sampling instant reduces to a standard quadratic
program of the form.

\(19\)

s.t. ![](media/image69.wmf)

This convex formulation allows the use of well-established numerical
methods such as active-set or interior-point algorithms. In practice,
only the first control increment of the optimal sequence is applied to
the plant, and the procedure is repeated in a receding-horizon fashion.
The QP structure is sparse and block-banded, making it suitable for
efficient real-time solvers.

3.2. **Position control**

The position controller is designed based on the translational dynamics,
modeled in the inertial frame as:

\(22\)

\(21\)

\(20\)

Since modeling errors and environmental disturbances are unavoidable, we
further consider the effect of disturbances in the controller design.
Noise vector assumption ![](media/image72.wmf) which represents matched
and bounded disturbance. Then we have:

\(23\)

**Feedback Linearization**

Consider a nonlinear dynamic system of the form: ![](media/image74.wmf)
where $d$denotes matched disturbances. The system output is defined
as:![](media/image75.wmf)is the output of the system.

The Derivative of y given by:![](media/image76.wmf)

Where ![](media/image77.wmf)is the Lie detivative of h with respect to
f:

**(i)** if ![](media/image78.wmf)then ![](media/image79.wmf)is
independent of u

**(ii)** Higher-order derivatives can be computed as:

![](media/image80.wmf)

The Lie derivative measures how a vector field or function changes along
the flow of another vector field.

If ![](media/image81.wmf) and ![](media/image82.wmf)then:
![](media/image83.wmf)![](media/image84.wmf), where
![](media/image85.wmf)is the relative degree of the system.

According to (23), when the relative degree of the system equals the
number of outputs to be tracked, feedback linearization can be applied
without considering the zero dynamics. In this case, the outputs are
directly controlled by the virtual input $v$, and the system errors are
mapped into two strictly linear subsystems. However, in the presence of
matched disturbances and modeling uncertainties, pure feedback
linearization may still yield steady-state errors. Therefore, the
dynamic controller is combined with the Integral--Terminal Adaptive
Sliding Mode Control (IT-ASMC) technique in Section (b) to enhance
robustness and guarantee finite-time convergence.

3.  **Intergral Terminal Adaptive Sliding Mode control**

The IT-ASMC controller is applied to eliminate instantaneous errors. For
nonlinear dynamic systems with bounded matched disturbances, yet without
prior knowledge of the disturbance bounds, an Adaptive SMC (ASMC) law is
employed. In addition, we propose combining Terminal SMC (TSMC) with
Integral SMC (ISMC) in order to design both the reaching phase and a
sliding manifold that guarantees finite-time convergence to zero.

\(27\)

\(26\)

\(25\)

\(30\)

\(29\)

\(28\)

With the sliding surface designed as above, the system is stable for a
finite time.

\(33\)

\(32\)

\(31\)

where ![](media/image89.wmf)

\(36\)

\(35\)

\(34\)

From (25)w,(26),(27) we proceed to design such that
![](media/image91.wmf) thus:

![](media/image92.wmf)

With ![](media/image93.wmf)

\(IV\)

\(III\)

\(II\)

\(I\)

**Figure 3.** **Behavior of Angles** ![](media/image95.wmf) **on a
Trigonometric Circle**

When the value of ![](media/image96.wmf)Lies in (I) và (III)

Value of ![](media/image97.wmf) is computed![](media/image98.wmf)

When the value of ![](media/image96.wmf) Lies in (II) và (IV)

Value of ![](media/image97.wmf) is computed ![](media/image99.wmf)

# **RRT**★ **And CBF** 

***5.1. Rapidly-Exploring Random Tree Star***

*RRT\* is an asymptotically optimal sampling-based motion planning
algorithm. It incrementally builds a tree by randomly sampling the
configuration space and connecting each new sample to the nearest
feasible node. Unlike standard RRT, the RRT\* algorithm includes a
rewiring step that locally updates parent nodes to minimize path cost,
ensuring that the solution converges to the optimal trajectory as the
number of samples increases. This makes RRT\* suitable for generating
globally efficient waypoints in cluttered environments such as
radar-coverage maps.*

***5.2. Control Barrier Function.***

*A Control Barrier Function (CBF) enforces forward invariance of a
safety set* ![](media/image100.wmf)*for an affine system*
![](media/image101.wmf)*The CBF imposes the constraint*

![](media/image102.wmf) *class.* *In practice, a small quadratic program
minimally adjusts the nominal control* $u_{\text{nom}}$*to satisfy the
CBF and actuator limits.* *This guarantees that system trajectories
remain inside* $\mathcal{S}$*in real time, ensuring safety (e.g.,
radar-zone avoidance) without sacrificing performance.*

# **Simulation results** 

![**Figure 4.** **RRT**★ **algorithm
simulation**](media/image103.png){alt="A graph of a diagram AI-generated content may be incorrect."
width="3.379861111111111in" height="1.832638888888889in"}

![**Figure 5 Simulate the tracking
process**](media/image104.png){alt="A graph of a line graph AI-generated content may be incorrect."
width="3.379861111111111in" height="1.9527777777777777in"}

![**Figure 6. results after
tracking**](media/image105.png){alt="A graph of a graph AI-generated content may be incorrect."
width="3.379861111111111in" height="1.5125in"}

![**Figure 7 Tracking performance in the
x-axis**](media/image106.png){alt="A graph of a function AI-generated content may be incorrect."
width="3.379861111111111in" height="1.5875in"}

![**Figure 8 Tracking performance in the
y-axis**](media/image107.png){alt="A graph with lines and numbers AI-generated content may be incorrect."
width="3.379861111111111in" height="1.5875in"}

![](media/image39.wmf)![](media/image108.png){width="3.379861111111111in"
height="1.5875in"}

![**Figure 9. Tracking performance in the
z-axis**](media/image109.png){alt="A graph of a function AI-generated content may be incorrect."
width="3.379861111111111in" height="1.5618055555555554in"}

![**Figure 10. Attitude tracking (φ, θ,
ψ)**](media/image110.png){alt="A white sheet with black lines and blue text AI-generated content may be incorrect."
width="3.3963965441819775in" height="1.2609919072615923in"}

**Figure 11. Control inputs (U1--U4)**

# **Conclution**

This paper presented an integrated radar-aware quadrotor control scheme
combining RRT★ path planning, LPV--MPC guidance, and an
Integral-Terminal Adaptive Sliding-Mode Controller (IT-ASMC). The
proposed IT-ASMC achieves finite-time tracking without a reaching phase
and maintains robustness against bounded high-frequency disturbances, as
confirmed by simulation. The overall LPV--MPC-FB--CBF--IT-ASMC structure
demonstrates precise, stable, and disturbance-rejected trajectory
tracking, providing a strong foundation for future real-time
implementation and multi-UAV cooperative extensions.

# **Acknowledment**

The authors would like to express their sincere gratitude to **Dr.
Phuong Tung Pham** from Ho Chi Minh City University of Technology
(HCMUT) for his invaluable guidance, constructive feedback, and
continuous support throughout the development of this work.

# **References**

  --------------------------------------
  \[1\]   A. E. H. N. T. a. D. L. K.
          Sidi Brahim, \"Anti-saturation
          Finite Time Adaptive Altitude
          Quadrotor Control Under
          Unknown Disturbances,\" in
          *IFAC Papers OnLine, vol. 55,
          no. 22, pp. 287--292, 2022*,
          2022.
  ------- ------------------------------
  \[2\]   L. Pan, M. Catellani, L.
          Sabattini and N. Ayanian,
          \"Robust Trajectory Generation
          and Control for Quadrotor
          Motion Planning with
          Field-of-View Control Barrier
          Certification,\" in *ICRA*,
          2024.

  \[3\]   M. I. V. S. S. D. S. S. V. L.
          a. R. F. Zeinah Shayan,
          \"Exponential control barrier
          function and model predictive
          control for jerk-level
          reactive motion planning of
          quadrotors,\" *Control
          Engineering Practice, vol.
          164, 2025, Article no.
          106489,* 2025.

  \[4\]   G. W. a. K. Sreenath,
          \"Safety-Critical Control of a
          Planar Quadrotor\".

  \[5\]   T. T. V. N. D. Duy Nam Bui,
          \"Lyapunov-based Nonlinear
          Model Predictive Control for
          Attitude Trajectory Tracking
          of Unmanned Aerial Vehicles\".

  \[6\]   V. P. M. B. Mohamed Achraf
          Senoussi, \"Quadrotor Control
          using a Multilayer MPC-MHE
          Scheme based on LPV and
          Feedback Linearization
          Approaches\".

  \[7\]   S. M. a. A. F. Omid Mofid,
          \"Adaptive Integral-Type
          Terminal Sliding Mode Control
          for Unmanned Aerial Vehicle
          Under Model Uncertainties and
          External Disturbances,\" *IEEE
          Access, vol. 9, pp. 54497 --
          54509, 2021.*

  \[8\]   C. A. IYER, \"Model Predictive
          Control (MPC) of Quadcopters
          using LPV techniques\".
  --------------------------------------
